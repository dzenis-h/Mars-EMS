const google = require("googleapis");
const authentication = require("../../authentication");
const config = require("../../config/spreadsheet/settings");
const axios = require("axios");
const moment = require("moment");
moment.suppressDeprecationWarnings = true; // removing those Deprecation Warnings that aren't relavant
const reportsService = require("../services/ReportsService");
const url = require("../../config/baseUrl");

const { removeSelecetedDate } = require("../controllers/ClearDataController");

module.exports = {
  getDetails: async (req, res) => {
    const auth = await authentication.authenticate();
    const sheets = google.sheets("v4");
    sheets.spreadsheets.values.get(
      {
        auth: auth,
        spreadsheetId: config.spreadsheetSettings.spreadsheetId, // id of spreadsheet
        range: config.spreadsheetSettings.employeeSheetId // name of employee spreadsheet and range- get all cells
      },
      async (err, response) => {
        if (err) {
          res.serverError(err);
          return;
        }
        const rows = response.values; // response-all cells
        const updatedData = reportsService.giveMeEmps(rows);

        const finalData = await finalDetailsPreparation(updatedData);

        // Sending the server data to frontend
        setTimeout(() => {
          if (finalData.length === 0) {
            res.err("No data found.");
          } else {
            res.ok(finalData);
          }
        }, 1800); // Some of these calculations are pretty heavy - TODO: Make it more efficient!
      }
    );
  }
};

finalDetailsPreparation = async updatedData => {
  const prepData = {};

  // Getting the relevant FULL salary info
  const salaryData = [];
  const empData = [];

  try {
    const apiData = await getApiData();
    const preparingData = await relevantEmps(apiData, updatedData);

    // Sending the req to get the unique salary data
    preparingData.map(name => {
      getEmployee(name)
        .then(sal => {
          salaryData.push(sal.data);
          empData.push(name);
        })
        .then(data => {
          return getRelevantSalary(salaryData, apiData).then(onlyRelevant => {
            prepData.names = empData;
            prepData.salaryInfo = onlyRelevant;
          });
        });
    });
    return prepData;
  } catch (error) {
    console.log(error);
  }
};

getRelevantSalary = async (salaryData, selectedDate) => {
  return await relevantSalary(salaryData, selectedDate);
};

getApiData = async () => {
  const res = await axios.get(`${url.baseUrl}/api`);
  const selectedDate = res.data.pop().selectedDate; // Getting the 'selectedDate'

  return selectedDate;
};

(relevantEmps = (date, data) => {
  let relevantNames = [];
  let finalNames = [];

  // let xo = 201803;
  // IF THEY STARTED WORKING BEFORE THE SELECTED DATE AND STOPPED WORKING AFTER THAT DATE
  data.forEach(emp => {
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
    sal.map(x => {
      x.map(y => {
        if (
          api ==
            parseInt(
              y.year +
                moment()
                  .month(y.month)
                  .format("MM"),
              10
            ) &&
          y.totalNetSalary !== undefined
        ) {
          relevantData.push(y);
        }
      });
    });
    return relevantData;
  }),
  // Making the req to get the relevant salary info
  (getEmployee = async value => {
    return await axios({
      method: "get",
      url: `${url.baseUrl}/employee/getEmployee?employeeSheetName=${value}`
    });
  });
