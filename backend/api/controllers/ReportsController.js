const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const axios = require("axios");
const reportsService = require("../services/ReportsService");
const url = require("../../config/baseUrl");
const promisify = require("util").promisify;

module.exports = {
  getReports: async (req, res) => {
    const auth = await authentication.authenticate();
    const sheets = google.sheets("v4");
    const getValues = promisify(sheets.spreadsheets.values.get);
    try {
      const response = await getValues({
        auth,
        spreadsheetId: config.spreadsheetSettings.spreadsheetId,
        range: config.spreadsheetSettings.employeeSheetId,
      });
      const rows = response.values; // response-all cells
      const updatedData = reportsService.giveMeEmps(rows);
      const allEmps = reportsService.justNames(updatedData);

      const allEmpsData = getSalaryData(allEmps);

      const resolvedData = await Promise.all(allEmpsData);
      const prepData = mapData(resolvedData);
      const detailedData = getDetailedData(prepData);
      const finalData = finalPreparation(detailedData);

      if (!finalData || finalData.length === 0) {
        res.serverError("No data found.");
      } else {
        res.ok(finalData);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

mapData = (data) => {
  return data.map((x) => x.data);
};

finalPreparation = (data) => {
  const finalData = {};

  try {
    const theYears = longReduce(data.uniqueYears); // returning unique and relevant years
    const theMonths = longReduce(data.uniqueMonths); // returning unique and relevant months
    const longestSalary = longReduce(data.netSumArr); // returning the longest running salary
    // Getting the numer of  employees depending on the date
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
  } catch (error) {
    console.log("Data was NOT ready !!!");
  }
};

getDetailedData = (inputData) => {
  const prepData = {};

  const uniqueYears = [];
  const uniqueMonths = [];

  const netSumArr = [];
  const grossSumArr = [];
  const mealSumArr = [];
  const taxSumArr = [];
  const handSumArr = [];

  try {
    inputData.map((x) => {
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
    console.log("ERROR in getDetailedData", error);
  }
};

// Making sure the last relevant (active) values are used
longReduce = (longest) => {
  try {
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
  } catch (error) {
    console.log("Problem in the 'longReduce'", error);
  }
};

// Getting all salary data
getSalaryData = (emps) => {
  return emps.map(async (emp) => {
    return await getEmployee(emp);
  });
};

// Summing the relevant salary data
sumUp = (array) => {
  const result = array.reduce((r, a) => {
    a.map((b, i) => {
      r[i] = (r[i] || 0) + b;
    });
    return r;
  }, []);
  return result;
};

// Making the req to get the relevant salary info
getEmployee = (value) => {
  return axios({
    method: "get",
    url: `${url.baseUrl}getEmployee?employeeSheetName=${value}`,
  });
};

// Preparing the specific data
getDetails = (data) => {
  const bigData = {};

  const yearsArr = [];
  const monthsArr = [];
  const netArr = [];
  const grossArr = [];
  const mealArr = [];
  const taxArr = [];
  const handSalaryArr = [];

  data.map((x) => {
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
