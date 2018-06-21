/**
 * LoanController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let employeeService = require("../services/EmployeeService");
let salaryService = require("../services/SalariesService");
let loanService = require("../services/LoanService");
let google = require('googleapis');
let authentication = require("../../authentication");
let config = require('../../config/spreadsheet/settings');
let EmployeeApi = require('../controllers/EmployeeController');
const _ = require('lodash');
let axios = require('axios');
let moment = require('moment');

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
      res.ok('Loans successfully added');
    }
  },

  getByDate: (req, res) => {
    const params = req.allParams();

    Loan.find().exec((err, response) => {
      if (err) {
        return res.serverError(err);
      }
      const data = response.filter(item => item.date.getMonth() == params.month && item.date.getFullYear() == params.year)
      return res.json(data);
    });
  },

  getLoansData: (req, res) => {
    salaryService.getActiveEmployees().then((employees) => {
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
                const singleEmployeeData = loanService.mapSalaryAndLoansDataFromSpreadsheet(employees[employeeOrderId].jmbg, employeeNameAndSurname, response.values); // response-all cells
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
  }
}