import initialState from "../initial/initialState";
import * as actionTypes from "../actionTypes/actionTypes";

const reportsReducer = (state = initialState.reports, action) => {
  switch (action.type) {
    case actionTypes.GET_REPORTS:
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export default reportsReducer;
