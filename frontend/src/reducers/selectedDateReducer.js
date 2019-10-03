import initialState from "../initial/initialState";
import * as actionTypes from "../actionTypes/actionTypes";

const reportsReducer = (state = initialState.selectedDate, action) => {
  switch (action.type) {
    case actionTypes.SELECTED_DATE:
      return action.payload;
    default:
      return state;
  }
};

export default reportsReducer;
