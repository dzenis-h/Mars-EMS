const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const axios = require("axios");
const reportsService = require("../services/ReportsService");
const url = require("../../config/baseUrl");
const promisify = require("util").promisify;
const moment = require("moment");
moment.suppressDeprecationWarnings = true; // removing those Deprecation Warnings that aren't relavant

module.exports = {
  getDetails: async (req, res) => {
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
      let finalData = {};

      if (req.body) {
        // let date = 201811;
        const { selectedDate } = req.body;
        const prepData = await finalDetailsPreparation(
          selectedDate,
          updatedData
        );
        finalData = await Promise.all(prepData);
        // FE expects an object -> TO-DO: Change that!
        const finalObj = Object.assign(...finalData, {});
        if (finalObj || finalObj.length !== 0) {
          res.ok(finalObj);
        } else {
          res.err("No data found.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};

finalDetailsPreparation = async (date, updatedData) => {
  const prepData = {};

  // Getting the relevant FULL salary info
  const salaryData = [];
  const empData = [];

  try {
    const preparingData = await relevantEmps(date, updatedData);

    // Sending the req to get the unique salary data
    return preparingData.map(async (name) => {
      const salary = await getEmployee(name);
      salaryData.push(salary.data);
      empData.push(name);
      const onlyRelevant = await getRelevantSalary(salaryData, date);
      prepData.names = empData;
      prepData.salaryInfo = onlyRelevant;
      return prepData;
    });
  } catch (error) {
    console.log(error);
  }
};

getRelevantSalary = async (salaryData, selectedDate) => {
  return await relevantSalary(salaryData, selectedDate);
};

(relevantEmps = (date, data) => {
  let relevantNames = [];
  let finalNames = [];

  // let date = 201803;
  // IF THEY STARTED WORKING BEFORE THE SELECTED DATE AND STOPPED WORKING AFTER THAT DATE
  data.forEach((emp) => {
    //  2013 - 2012 - 2014
    if (
      (date > parseInt(moment(emp.startdate).format("YYYYMM"), 10) &&
        date < parseInt(moment(emp.enddate).format("YYYYMM"), 10)) ||
      // IF THEY STARTED WORKING BEFORE THE SELECTED DATE AND STILL WORKING
      (date > parseInt(moment(emp.startdate).format("YYYYMM"), 10) &&
        parseInt(moment(emp.enddate).format("YYYYMM"), 10) == undefined)
    ) {
      relevantNames.push(emp);
    }
  });
  finalNames = reportsService.justNames(relevantNames);
  // Getting the names to use for unique sheet req
  return finalNames;
}),
  // Getting only the relevant salary data
  (relevantSalary = (sal, api) => {
    let relevantData = [];
    sal.map((x) => {
      x.map((y) => {
        if (
          api == parseInt(y.year + moment().month(y.month).format("MM"), 10) &&
          y.totalNetSalary !== undefined
        ) {
          relevantData.push(y);
        }
      });
    });
    return relevantData;
  }),
  // Making the req to get the relevant salary info
  (getEmployee = async (value) => {
    return await axios({
      method: "get",
      url: `${url.baseUrl}/employee/getEmployee?employeeSheetName=${value}`,
    });
  });
