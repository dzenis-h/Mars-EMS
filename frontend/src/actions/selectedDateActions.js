import * as actionTypes from "../actionTypes/actionTypes";

export const saveSelectedDate = date => {
  return {
    type: actionTypes.SELECTED_DATE,
    payload: date
  };
};
