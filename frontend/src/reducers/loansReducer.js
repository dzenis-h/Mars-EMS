import initialState from "../initial/initialState";
import * as actionTypes from "../actionTypes/actionTypes";

const loansReducer = (state = initialState.loans, action) => {
  switch (action.type) {
    case actionTypes.GET_LOANS:
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export default loansReducer;
