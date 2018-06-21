let employeeService = require("./EmployeeService");
let config = require('../../config/spreadsheet/settings');
let google = require('googleapis');
let authentication = require("../../authentication");

const accountantColumnIds = {   // Accountant's doc
  jmbg: 1,
  bankGrossSalary: 7,
  bankNetSallary: 8,
  bankHotMeal: 5,
  bankContributes: 9
}

const mainSpreadsheetColumnIds = {  //CEO's doc
  totalNetSalary: 2,
  installment: 14
}

module.exports = {

  getAccountantSpreadsheetName() {
    let employeesData = [];
    return new Promise((resolve, reject) => {
      authentication.authenticate().then((auth) => {
        const sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: config.spreadsheetSettings.accountantSheetName, // name of settings spreadsheet
        }, (err, response) => {
          if (err) {
            reject(err)
          }
          const rows = response.values; // response-all cells
          if (rows.length === 0) {
            reject('No data found')
          } else {
            resolve(rows[0][1]); // accountant spreadsheet name [0][1]
          }
        });
      });
    })
  },

  getDataFromAccountantSpreadsheet(spreadsheetId, month) {
    return new Promise((resolve, reject) => {
      authentication.authenticate().then((auth) => {
        const sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
          auth: auth,
          spreadsheetId: spreadsheetId, // id of spreadsheet
          range: month, // name of month spreadsheet and range- get all cells
        }, (err, response) => {
          if (err) {
            reject(err);
          }
          const rows = response.values; // response-all cells
          if (rows.length === 0) {
            reject('No data found');
          } else {
            const updatedData = mapSalariesDataByAccountant(rows);
            resolve(updatedData);
          }
        });
      });
    });
  },

  getActiveEmployees() {
    return new Promise((resolve, reject) => {
      authentication.authenticate().then((auth) => {
        const sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
          range: config.spreadsheetSettings.employeeSheetId, // name of employee spreadsheet and range- get all cells
        }, (err, response) => {
          if (err) {
            reject(err);
          }
          const rows = response.values; // response-all cells
          const activeEmployeesList = employeeService.mapActiveEmployeesToJson(rows);
          if (rows.length === 0) {
            reject('No data found.');
          } else {
            resolve(activeEmployeesList);
          }
        });
      });
    });
  },

  mapSalaryAndLoansDataFromSpreadsheet(jmbg, name, data, isPayoneer) {
    let elem = {};
    let loansSum;
    Object.entries(mainSpreadsheetColumnIds).map((item) => {
      if (item[1] === 14) {   //installment column
      // Getting the totals
      const loansSum = loansTotal(data[13]);
      const installmentsSum = sumInstallments(data[13], data[14]);
      // Getting the last installment
      const lastInstallment = getLastInstallment(data[13], data[14]);
      // Calculating the loans - installments data
      const differenceLoansSumAndInstallmentsSum = loansSum - installmentsSum;
      if (differenceLoansSumAndInstallmentsSum > lastInstallment) {
        elem[item[0]] = lastInstallment;
      } else if (differenceLoansSumAndInstallmentsSum == lastInstallment) {
        elem[item[0]] = lastInstallment;
      } else if (differenceLoansSumAndInstallmentsSum == 0) {
        elem[item[0]] = 0; 
      } else if (differenceLoansSumAndInstallmentsSum < lastInstallment) {
        elem[item[0]] = differenceLoansSumAndInstallmentsSum; 
      } else {
        elem[item[0]] = 0;
      }
      } else {
        const extractedColumnData = data[item[1]].pop();
        elem[item[0]] = parseInt(extractedColumnData);// item[0]- key, item[1]- value-columnId
    }
      elem.jmbg = jmbg;
      elem.name = name;
      elem.isPayoneer = isPayoneer === 'TRUE' ? true : false;
      elem.lastRowNumber = data[0].length;
    });
    return elem;
  },

  prepareSalariesDataToImport(year, month, salary) {
    const importData = {
      year: year,
      month: month,
      totalNetSalary: salary.totalNetSalary.toFixed(2),
      totalGrossSalary: salary.totalGrossSalary.toFixed(2),
      bankGrossSalary: salary.bankGrossSalary.toFixed(2),
      bankNetSallary: salary.bankNetSallary.toFixed(2),
      bankContributes: salary.bankContributes.toFixed(2),
      bankHotMeal: salary.bankHotMeal.toFixed(2),
      handSalary: salary.handSalary.toFixed(2),
      handBonus: salary.handBonus.toFixed(2),
      handPenalty: salary.handPenalty.toFixed(2),
      handTotal: salary.handTotal,
      note: salary.note,
      loan: salary.loan.toFixed(2),
      installment: salary.installment.toFixed(2)
    }
    return importData;
  }

}

mapSalariesDataByAccountant = (data) => {
  let result = [];
  for (let i = 1; i < data.length; i++) { //first row is header
    let elem = {};
    Object.entries(accountantColumnIds).map((item) => {
      if (item[0] == 'jmbg') {
        elem[item[0]] = data[i][item[1]].toString()
      } else {
        elem[item[0]] = parseFloat(data[i][item[1]].replace('.','')); // item[0]- key, item[1]- value-columnId
      }
    })
    result.push(elem);
  }
  return result;
},

sumInstallments = (loanColumn, installmentColumn) => {
  const loanIndexes = getLoanEntryIndexes(loanColumn);
  let installmentSum = 0;
    for (let i = 2; i < installmentColumn.length; i++) { //i=2, skip header and title, data[13]-loans column
      if (installmentColumn[i] !== '' && !loanIndexes.includes(i)) { // skip row where loan is entered
        installmentSum += parseInt(installmentColumn[i]);
    }}
  return installmentSum;
},

getLastInstallment = (loanColumn, installmentColumn) => {
  const lastEntryIndex = getLastLoanRowIndex(loanColumn);
  return parseInt(installmentColumn[lastEntryIndex]) || 0;
},

getLastLoanRowIndex = (data) => {
  let indexes = [];
    for (let i = 2; i < data.length; i++) { //i=2, skip header and title, data[13]-loans column
      if (data[i] !== '') {
        indexes.push(i);
    }}
  return indexes.pop();
},

getLoanEntryIndexes = (loanColumn) => {
  let indexes = [];
    for (let i = 2; i < loanColumn.length; i++) { //i=2, skip header and title, data[13]-loans column
      if (loanColumn[i] !== '' && loanColumn[i] != 0) {
        indexes.push(i);
    }}
  return indexes;
},

loansTotal = (data) => {
  let loansSum = 0;
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== '') {
        loansSum += parseInt(data[i]);
    }}
  return loansSum;
},
  
installmentTotal = (data) => {
  let installmentSum = 0;
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== '') {
        installmentSum += parseInt(data[i]);
    }}
  return installmentSum;
}