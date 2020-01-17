import * as actionTypes from "../actionTypes/actionTypes";
import DetailsApi from "../api/reportsDetailsApi";

export const getSpecificSalaryData = (fullNames, salaryInfo) => {
  return {
    type: actionTypes.GET_SPECIFIC_SALARIES,
    currentSession: {
      fullNames,
      salaryInfo
    }
  };
};

export const getReportsDetails = data => {
  return {
    type: actionTypes.GET_REPORTS_DETAILS,
    data
  };
};

export const getReportDetailsAsync = date => {
  return async dispatch => {
    try {
      const details = await DetailsApi.getDetails(date);
      dispatch(getReportsDetails(details.data));
    } catch (error) {
      console.log("Error while loading reports data", error);
      throw error;
    }
  };
};
