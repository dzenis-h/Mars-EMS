const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const axios = require("axios");
const reportsService = require("../services/ReportsService");
const url = require("../../config/baseUrl");

module.exports = {
  getReports: (req, res) => {
    authentication.authenticate().then(auth => {
      const sheets = google.sheets("v4");
      sheets.spreadsheets.values.get(
        {
          auth: auth,
          spreadsheetId: config.spreadsheetSettings.spreadsheetId,
          range: config.spreadsheetSettings.employeeSheetId
        },
        (err, response) => {
          if (err) {
            res.serverError(err);
            return;
          }
          const rows = response.values; // response-all cells
          const updatedData = reportsService.giveMeEmps(rows);
          const allEmps = reportsService.justNames(updatedData);

          let allEmpsData = getSalaryData(allEmps);

          let uniqueYears = [];
          let uniqueMonths = [];

          let netSumArr = [];
          let grossSumArr = [];
          let mealSumArr = [];
          let taxSumArr = [];
          let handSumArr = [];

          setTimeout(() => {
            allEmpsData.map(x => {
              // Getting all the detailed data
              let details = getDetails(x);
              let data = Object.assign([], details);

              // Preparing the year - month data
              uniqueYears.push(data.year);
              uniqueMonths.push(data.month);

              // Making sure all values are 'NUMBERS' + pushing them into separate arrays
              let netNum = data.net.map(Number);
              netSumArr.push(netNum);
              let grossNum = data.gross.map(Number);
              grossSumArr.push(grossNum);
              let mealNum = data.meal.map(Number);
              mealSumArr.push(mealNum);
              let taxNum = data.tax.map(Number);
              taxSumArr.push(taxNum);
              let handNum = data.hand.map(Number);
              handSumArr.push(handNum);
            });
          }, 1100);

          setTimeout(() => {
            let finalData = {};

            let theYears = longReduce(uniqueYears); // returning unique and relevant years
            let theMonths = longReduce(uniqueMonths); // returning unique and relevant months
            let longestSalary = longReduce(netSumArr); // returning the Longest running salary

            // Getting the numer of  eployees depending on the date
            const activeEmps = Array.from(longestSalary, (_, i) =>
              netSumArr.reduce((a, arr) => a + Boolean(arr[i]), 0)
            );

            // Calculating the summed values of salary data
            let neto = sumUp(netSumArr);
            let gross = sumUp(grossSumArr);
            let meals = sumUp(mealSumArr);
            let taxes = sumUp(taxSumArr);
            let hands = sumUp(handSumArr);

            // Preparing the final object for frontend
            finalData.yearsData = theYears;
            finalData.monthsData = theMonths;
            finalData.netoData = neto;
            finalData.grossData = gross;
            finalData.mealsData = meals;
            finalData.taxesData = taxes;
            finalData.handSalaryData = hands;
            finalData.numOfEmps = activeEmps;

            if (finalData.length === 0) {
              res.err("No data found.");
            } else {
              res.ok(finalData);
            }
          }, 1500);
        }
      );
    });
  }
};

// Making sure the last relevant (active) values are used
longReduce = longest => {
  let val;
  val = longest.reduce(function(a, i, ii) {
    if (ii === 1) {
      return a;
    }
    if (i.length > a.length) {
      return i;
    }
    return a;
  });
  return val;
};

// Getting all salary data
getSalaryData = emps => {
  let salaryArr = [];
  emps.map(one => {
    getEmployee(one).then(two => {
      salaryArr.push(two.data);
    });
  });
  return salaryArr;
};
// Summing the relevant salary data
sumUp = array => {
  let result = array.reduce(function(r, a) {
    a.map(function(b, i) {
      r[i] = (r[i] || 0) + b;
    });
    return r;
  }, []);
  return result;
};
// Making the req to get the relevant salary info
getEmployee = value => {
  return axios({
    method: "get",
    url: `${url.baseUrl}getEmployee?employeeSheetName=${value}`
  });
};
// Preparing the specific data
getDetails = data => {
  let bigData = {};

  let yearsArr = [];
  let monthsArr = [];
  let netArr = [];
  let grossArr = [];
  let mealArr = [];
  let taxArr = [];
  let handSalaryArr = [];

  data.map(x => {
    yearsArr.push(x.year);
    bigData.year = yearsArr;
    monthsArr.push(x.month);
    bigData.month = monthsArr;
    netArr.push(x.totalNetSalary);
    bigData.net = netArr;
    grossArr.push(x.bankGrossSalary);
    bigData.gross = grossArr;
    mealArr.push(x.bankHotMeal);
    bigData.meal = mealArr;
    taxArr.push(x.bankContributes);
    bigData.tax = taxArr;
    handSalaryArr.push(x.handSalary);
    bigData.hand = handSalaryArr;
  });
  return bigData;
};
