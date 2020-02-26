const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const axios = require("axios");
const reportsService = require("../services/ReportsService");
const url = require("../../config/baseUrl");

module.exports = {
  getReports: async (req, res) => {
    const auth = await authentication.authenticate();
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

        const allEmpsData = getSalaryData(allEmps);

        setTimeout(async () => {
          const prepData = await getDetailedData(allEmpsData);
          const finalData = await finalPreparation(prepData);

          if (finalData.length === 0) {
            res.err("No data found.");
          } else {
            res.ok(finalData);
          }
        }, 1500); // Some of these calculations are pretty heavy - TODO: Make it more efficient!
      }
    );
  }
};

finalPreparation = async data => {
  const finalData = {};

  const theYears = await longReduce(data.uniqueYears); // returning unique and relevant years
  const theMonths = await longReduce(data.uniqueMonths); // returning unique and relevant months
  const longestSalary = await longReduce(data.netSumArr); // returning the longest running salary

  // Getting the numer of  eployees depending on the date
  const activeEmps = Array.from(longestSalary, (_, i) =>
    data.netSumArr.reduce((a, arr) => a + Boolean(arr[i]), 0)
  );

  // Calculating the summed values of salary data
  const neto = sumUp(data.netSumArr);
  const gross = sumUp(data.grossSumArr);
  const meals = sumUp(data.mealSumArr);
  const taxes = sumUp(data.taxSumArr);
  const hands = sumUp(data.handSumArr);

  // Preparing the final object for the frontend
  finalData.yearsData = theYears;
  finalData.monthsData = theMonths;
  finalData.netoData = neto;
  finalData.grossData = gross;
  finalData.mealsData = meals;
  finalData.taxesData = taxes;
  finalData.handSalaryData = hands;
  finalData.numOfEmps = activeEmps;

  return finalData;
};

getDetailedData = async inputData => {
  const prepData = {};

  const uniqueYears = [];
  const uniqueMonths = [];

  const netSumArr = [];
  const grossSumArr = [];
  const mealSumArr = [];
  const taxSumArr = [];
  const handSumArr = [];

  try {
    await inputData.map(x => {
      // Getting all the detailed data
      const details = getDetails(x.reverse()); // Reversing the entire object, so the most recent data is send 1st
      const data = Object.assign([], details);
      // Preparing the year - month data
      uniqueYears.push(data.year);
      uniqueMonths.push(data.month);
      // Making sure all values are 'NUMBERS' + pushing them into separate arrays
      const netNum = data.net.map(Number);
      netSumArr.push(netNum);
      prepData.netSumArr = netSumArr;
      const grossNum = data.gross.map(Number);
      grossSumArr.push(grossNum);
      prepData.grossSumArr = grossSumArr;
      const mealNum = data.meal.map(Number);
      mealSumArr.push(mealNum);
      prepData.mealSumArr = mealSumArr;
      const taxNum = data.tax.map(Number);
      taxSumArr.push(taxNum);
      prepData.taxSumArr = taxSumArr;
      const handNum = data.hand.map(Number);
      handSumArr.push(handNum);
      prepData.handSumArr = handSumArr;
      // ...
      prepData.uniqueYears = uniqueYears;
      prepData.uniqueMonths = uniqueMonths;
    });
    return prepData;
  } catch (error) {
    console.log(error);
  }
};

// Making sure the last relevant (active) values are used
longReduce = longest => {
  const val = longest.reduce(
    (a, i, ii) => {
      if (ii === 1) {
        return a;
      }
      if (i.length > a.length) {
        return i;
      }
      return a;
    },
    [0]
  );
  return val;
};

// Getting all salary data
getSalaryData = emps => {
  const salaryArr = [];
  emps.map(one => {
    getEmployee(one).then(two => {
      salaryArr.push(two.data);
    });
  });
  return salaryArr;
};

// Summing the relevant salary data
sumUp = array => {
  const result = array.reduce(function(r, a) {
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
  const bigData = {};

  const yearsArr = [];
  const monthsArr = [];
  const netArr = [];
  const grossArr = [];
  const mealArr = [];
  const taxArr = [];
  const handSalaryArr = [];

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
