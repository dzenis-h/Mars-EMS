const _ = require('lodash');

const columnNames = {
  year: 'year',
  month: 'month',
  totalNetSalary: 'ukupno plata na ruke',
  totalGrossSalary: 'bruto ukupno',
  bankGrossSalary: 'bruto plata',
  bankNetSallary: 'neto plata',
  bankContributes: 'doprinosi',
  bankHotMeal: 'topli obrok',
  handSalary: 'plata',
  handBonus: 'bonus',
  handPenalty: 'odbitak',
  handTotal: 'ukupno',
  note: 'note',
  loan: 'kredit',
  installment: 'rata'
}

module.exports = {

  mapEmployeeSheetToJson(data) {
    let result = [];
    for (let i = 1; i < data.length; i++) { //first row is header
      let elem = {};
      data[0].map((item, index) => {
        if (typeof data[i][index] != 'undefined') { //employee is active, end date is undefined
          elem[item.toLocaleLowerCase()] = data[i][index];
        }
      })
      elem['rowNumber'] = i + 1; // row number of item in spreadsheet. Needs for delete/update later; i+1 - first row is header
      result.push(elem);
    }
    return result;
  },

  mapActiveEmployeesToJson(data) {
    let result = [];
    for (let i = 1; i < data.length; i++) { //first row is header
      let employeeIsWorking = true;
      let elem = {};
      data[0].map((item, index) => {
        if (typeof data[i][8] === 'undefined') { //enddate column - id 8 - if undefined-employee is active/still working
          elem[item.toLocaleLowerCase()] = data[i][index];
        } else {
          employeeIsWorking = false;
        }
      })
      if (employeeIsWorking) {
        result.push(elem);
      }
    }
    return result;
  },

  mapEmployeeDetailsSheetToJson(data) {
    let result = [];
    for (let i = 2; i < data.length; i++) { //first row is header
      let elem = {};
      let employeeWasHired = false;
      Object.keys(columnNames).map((item, index) => {
        if (typeof data[i][2] != 'undefined') { //total salary is empty - employee was not hired
          elem[item] = data[i][index];
          employeeWasHired = true;
        }
      })
      if (employeeWasHired) {
        elem['rowNumber'] = i + 1; // row number of item in spreadsheet. Needs for delete/update later; i+1 - first row is header
        result.push(elem);
      }
    }
    return result;
  },

  mapNewEmployee(employee) {
    let result = [];
    const employeeRow = ['jmbg', 'name', 'surname', 'birthdate', 'position', 'gender', 'isPayoneer', 'startdate'];

    for (let i = 0; i < employeeRow.length; i++) {
      result.push(employee[employeeRow[i]]); //format new employee in desired row order
    }
    return result;
  }
}