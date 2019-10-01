const employeeService = require("../services/EmployeeService");
const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const moment = require("moment");

module.exports = {
  getEmployees: (req, res) => {
    authentication.authenticate().then(auth => {
      const sheets = google.sheets("v4");
      sheets.spreadsheets.values.get(
        {
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: config.spreadsheetSettings.employeeSheetId // name of employee spreadsheet and range- get all cells
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          }
          const rows = response.values; // response-all cells
          const updatedData = employeeService.mapEmployeeSheetToJson(rows);
          if (rows.length === 0) {
            res.err("No data found.");
          } else {
            res.ok(updatedData);
          }
        }
      );
    });
  },

  disableEmployee: (req, res) => {
    const rowNumber = req.body.rowNumber;
    authentication.authenticate().then(auth => {
      const sheets = google.sheets("v4");
      sheets.spreadsheets.values.update(
        {
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: `${config.spreadsheetSettings.employeeSheetId}!I${rowNumber}`, // name of employee endDate column, rowNumber-row of desired item, I column end date
          valueInputOption: "USER_ENTERED",
          resource: {
            range: `${config.spreadsheetSettings.employeeSheetId}!I${rowNumber}`,
            values: [[moment().format("MM-DD-YYYY")]] //current date
          }
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          } else {
            res.send({ disabledEmployeeRowNumber: rowNumber });
          }
        }
      );
    });
  },

  addEmployee: (req, res) => {
    const lastRowNumber = req.body.lastRowNumber;
    const newEmployee = req.body.employee;
    authentication.authenticate().then(auth => {
      const sheets = google.sheets("v4");
      sheets.spreadsheets.values.update(
        {
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: `${config.spreadsheetSettings.employeeSheetId}!A${lastRowNumber}:H${lastRowNumber}`, // name of employee endDate column, rowNumber-row of desired item, H column end date
          valueInputOption: "USER_ENTERED",
          resource: {
            range: `${config.spreadsheetSettings.employeeSheetId}!A${lastRowNumber}:H${lastRowNumber}`,
            values: [Object.values(employeeService.mapNewEmployee(newEmployee))]
          }
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          } else {
            newEmployee["rowNumber"] = lastRowNumber;
            res.send(newEmployee);
          }
        }
      );

      sheets.spreadsheets.sheets.copyTo(
        {
          auth: auth,
          // The ID of the spreadsheet containing the sheet to copy.
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // TODO: Update placeholder value.
          // The ID of the sheet to copy.
          sheetId: config.spreadsheetSettings.templateId, // TODO: Update placeholder value.

          resource: {
            // The ID of the spreadsheet to copy the sheet to.
            destinationSpreadsheetId: config.spreadsheetSettings.spreadsheetId // TODO: Update placeholder value.
          }
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          }
        }
      );
    });
  },

  getEmployee: (req, res) => {
    authentication.authenticate().then(auth => {
      const sheets = google.sheets("v4");
      sheets.spreadsheets.values.get(
        {
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: req.query.employeeSheetName.toString() // name of employee sheet and range- get all cells
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          }
          const rows = response.values; // response-all cells
          const updatedData = employeeService.mapEmployeeDetailsSheetToJson(
            rows
          );
          if (rows.length === 0) {
            res.err("No data found.");
          } else {
            res.ok(updatedData);
          }
        }
      );
    });
  }
};
