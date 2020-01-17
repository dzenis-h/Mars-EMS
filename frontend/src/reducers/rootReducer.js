import { combineReducers } from "redux";
import employees from "./employeeReducer";
import loggedUser from "./userReducer";
import { reducer as formReducer } from "redux-form";
import googleSpreadSheetAuthReducer from "./googleSpreadsheetAuthReducer";
import generateSalariesReducer from "./generateSalariesReducer";
import reports from "./reportsReducer";
import reportsDetails from "./detailsReducer";
import loans from "./loansReducer";
import selectedDate from "./selectedDateReducer";

const rootReducer = combineReducers({
  employees,
  reports,
  reportsDetails,
  loans,
  selectedDate,
  loggedUser,
  form: formReducer,
  employeesSalaries: generateSalariesReducer,
  isAppGoogleSpreadsheetAuthenticated: googleSpreadSheetAuthReducer
});

export default rootReducer;
