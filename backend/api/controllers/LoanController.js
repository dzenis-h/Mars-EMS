/**
 * LoanController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const salaryService = require("../services/SalariesService");
const loanService = require("../services/LoanService");
const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");

module.exports = {
  addBulk: (req, res) => {
    const body = req.body;
    for (const item of body) {
      Loan.create(item).exec((err, response) => {
        if (err) {
          res.serverError(err);
          return;
        }
      });
      res.ok("Loans successfully added");
    }
  },

  getByDate: (req, res) => {
    const params = req.allParams();

    Loan.find().exec((err, response) => {
      if (err) {
        return res.serverError(err);
      }
      const data = response.filter(
        item =>
          item.date.getMonth() == params.month &&
          item.date.getFullYear() == params.year
      );
      return res.json(data);
    });
  },

  getLoansData: (req, res) => {
    salaryService.getActiveEmployees().then(employees => {
      let promises = [];
      do {
        let employeeOrderId = promises.length;
        promises.push(
          new Promise((resolve, reject) => {
            authentication.authenticate().then(auth => {
              const sheets = google.sheets("v4");
              sheets.spreadsheets.values.get(
                {
                  auth,
                  spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
                  range: `${employees[employeeOrderId]["name"]} ${employees[employeeOrderId]["surname"]}`, // name of specific employee sheet, ex. John Doe
                  majorDimension: "COLUMNS"
                },
                (err, response) => {
                  if (err) {
                    reject(err);
                  }
                  if (response.values.length === 0) {
                    reject("No data found.");
                  } else {
                    const employeeNameAndSurname = `${employees[employeeOrderId]["name"]} ${employees[employeeOrderId]["surname"]}`;
                    const singleEmployeeData = loanService.mapSalaryAndLoansDataFromSpreadsheet(
                      employees[employeeOrderId].jmbg,
                      employeeNameAndSurname,
                      response.values
                    ); // response-all cells
                    resolve(singleEmployeeData);
                  }
                }
              );
            });
          })
        );
      } while (employees.length != promises.length);

      return Promise.all(promises)
        .then(values => {
          res.ok(values);
        })
        .catch(err => {
          res.serverError(err);
        });
    });
  }
};
