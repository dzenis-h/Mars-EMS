import initialState from '../initial/initialState';
import * as actionTypes from '../actionTypes/actionTypes';

const googleSpreadSheetAuthReducer = (state = initialState.isAppGoogleSpreadsheetAuthenticated, action) => {
    switch (action.type) {
        case actionTypes.SET_GOOGLESPREADSHEET_AUTH:
            return true;

        case actionTypes.UNSET_GOOGLESPREADSHEET_AUTH:
            return false;

        default:
            return state;
    }
}

export default googleSpreadSheetAuthReducer;
