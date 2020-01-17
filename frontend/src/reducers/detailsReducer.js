import initialState from "../initial/initialState";
import * as actionTypes from "../actionTypes/actionTypes";

const reportsDetailReducer = (state = initialState.details, action) => {
  switch (action.type) {
    case actionTypes.GET_REPORTS_DETAILS:
      return Object.assign({}, action.data);

    case actionTypes.GET_SPECIFIC_SALARIES:
      return Object.assign({}, action.currentSession);

    default:
      return state;
  }
};

export default reportsDetailReducer;
