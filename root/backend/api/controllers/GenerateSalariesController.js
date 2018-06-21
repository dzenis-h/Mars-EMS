let salariesService = require("../services/SalariesService");
let employeeService = require("../services/EmployeeService");
let google = require('googleapis');
let authentication = require("../../authentication");
let config = require('../../config/spreadsheet/settings');
let moment = require('moment');

module.exports = {
  // From Accountant's docs
  getSalariesDataByAccountant: (req, res) => {
    const params = req.allParams();
    salariesService.getAccountantSpreadsheetName().then((accountantSpreadsheetId) => {
      salariesService.getDataFromAccountantSpreadsheet(accountantSpreadsheetId, params.month).then(response => {
        res.ok(response)
      }).catch(err => {
        res.serverError(err)
      }).catch(err => {
        res.serverError(err)
      });

    });
  },

  //From CEO's docs get data of employees
  getSalariesDataFromLastMonth: (req, res) => {
    salariesService.getActiveEmployees().then((employees) => {
      let promises = [];
      do {
        let employeeOrderId = promises.length;
        promises.push(new Promise((resolve, reject) => {
          authentication.authenticate().then((auth) => {
            const sheets = google.sheets('v4');
            sheets.spreadsheets.values.get({
              auth: auth,
              spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
              range: `${employees[employeeOrderId]['name']} ${employees[employeeOrderId]['surname']}`, // name of specific employee sheet, ex. Mehmed Jusic
              majorDimension: "COLUMNS",
            }, (err, response) => {
              if (err) {
                reject(err);
              }
              if (response.values.length === 0) {
                reject('No data found.');
              } else {
                const employeeNameAndSurname = `${employees[employeeOrderId]['name']} ${employees[employeeOrderId]['surname']}`;
                const singleEmployeeData = salariesService.mapSalaryAndLoansDataFromSpreadsheet(employees[employeeOrderId].jmbg, employeeNameAndSurname, response.values, employees[employeeOrderId].ispayoneer); // response-all cells
                resolve(singleEmployeeData);
              }

            });
          });
        }));
      }

      while (employees.length != promises.length);

      return Promise.all(promises).then(values => {
        res.ok(values);
      }).catch(err => {
        res.serverError(err);
      });
    });
  },

  //save data into spreadsheet
  importDataIntoSpreadsheet: (req, res) => {
    const lastRowNumber = req.body.lastRowNumber;
    const salaries = req.body.salaries;
    authentication.authenticate().then((auth) => {
      const sheets = google.sheets('v4');
      salaries.map(salaryInfo => {
        const insertDataFormat = salariesService.prepareSalariesDataToImport(req.body.year, req.body.month, salaryInfo);
        sheets.spreadsheets.values.update({
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: `${salaryInfo.name}!A${lastRowNumber}:O${lastRowNumber}`, // first empty row
          valueInputOption: 'USER_ENTERED',
          resource: {
            range: `${salaryInfo.name}!A${lastRowNumber}:O${lastRowNumber}`,
            values: [
              Object.values(insertDataFormat)
            ]
          }
        }, (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          }
        })
      })
      res.send("Data successfully imported");
    });
  },

}