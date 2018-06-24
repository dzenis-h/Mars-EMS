import {combineReducers} from 'redux';
import employees from './employeeReducer';
import loggedUser from './userReducer';
import {reducer as formReducer} from 'redux-form'
import googleSpreadSheetAuthReducer from "./googleSpreadsheetAuthReducer";
import generateSalariesReducer from "./generateSalariesReducer";

const rootReducer = combineReducers({
    employees,
    loggedUser,
    form: formReducer,
    employeesSalaries: generateSalariesReducer,
    isAppGoogleSpreadsheetAuthenticated: googleSpreadSheetAuthReducer
});

export default rootReducer;