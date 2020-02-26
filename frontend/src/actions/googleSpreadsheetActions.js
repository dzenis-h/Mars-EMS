import * as actionTypes from "../actionTypes/actionTypes";
import SpreadSheetApi from "../api/spreadsheetApi";
import { getEmployeesAsync } from "./employeeActions";
import { getReportsAsync } from "./reportsActions";
import { getLoansAsync } from "./loansActions";

export const setGoogleSpreadsheetAuth = data => {
  return {
    type: actionTypes.SET_GOOGLESPREADSHEET_AUTH,
    data
  };
};

export const unsetGoogleSpreadsheetAuth = data => {
  return {
    type: actionTypes.UNSET_GOOGLESPREADSHEET_AUTH,
    data
  };
};

export const checkIfAppIsGoogleSpreadsheetAuthenticated = () => {
  return async dispatch => {
    try {
      const res = await SpreadSheetApi.getToken();
      if (res.data.credentials !== undefined) {
        dispatch(setGoogleSpreadsheetAuth(res.data));
        dispatch(getEmployeesAsync());
        dispatch(getReportsAsync());
        dispatch(getLoansAsync());
      } else {
        dispatch(unsetGoogleSpreadsheetAuth(res.data));
      }
    } catch (error) {
      console.log("error while loading data", error);
      throw error;
    }
  };
};
