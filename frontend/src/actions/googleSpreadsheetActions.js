import * as actionTypes from '../actionTypes/actionTypes';
import SpreadSheetApi from "../api/spreadsheetApi";
import {getEmployeesAsync} from "./employeeActions";

export const setGoogleSpreadsheetAuth = (data) => {
    return {
        type: actionTypes.SET_GOOGLESPREADSHEET_AUTH,
        data
    }
}

export const unsetGoogleSpreadsheetAuth = (data) => {
    return {
        type: actionTypes.UNSET_GOOGLESPREADSHEET_AUTH,
        data
    }
}

export const checkIfAppIsGoogleSpreadsheetAuthenticated = () => {
    return dispatch => {
        return SpreadSheetApi.getToken()
            .then(res => {
                if (res.data.credentials !== undefined) {
                    dispatch(setGoogleSpreadsheetAuth(res.data));
                    dispatch(getEmployeesAsync());
                } else {
                    dispatch(unsetGoogleSpreadsheetAuth(res.data));
                }
            }).catch(error => {
                console.log('error while loading data', error);
                throw(error);
        });
    };
}