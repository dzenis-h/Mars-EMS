import * as actionTypes from "../actionTypes/actionTypes";
import ReportsApi from "../api/reportsApi";

export const getReports = data => {
  return {
    type: actionTypes.GET_REPORTS,
    data
  };
};

export const getReportsAsync = () => {
  return async dispatch => {
    try {
      const reports = await ReportsApi.getReportsData();
      dispatch(getReports(reports.data));
    } catch (error) {
      console.log("Error while loading reports", error);
      throw error;
    }
  };
};
