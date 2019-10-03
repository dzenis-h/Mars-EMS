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
      const reports = await ReportsApi.getReports();
      dispatch(getReports(reports.data));
    } catch (error) {
      console.log("error while loading employees", error);
      throw error;
    }
  };
};
