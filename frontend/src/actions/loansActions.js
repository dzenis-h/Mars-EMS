import * as actionTypes from "../actionTypes/actionTypes";
import LoansApi from "../api/loansApi";

export const getLoans = data => {
  return {
    type: actionTypes.GET_LOANS,
    data
  };
};

export const getLoansAsync = () => {
  return async dispatch => {
    try {
      const loans = await LoansApi.getLoansData();
      dispatch(getLoans(loans.data));
    } catch (error) {
      console.log("Error while loading reports", error);
      throw error;
    }
  };
};
