import initialState from "../initial/initialState";
import * as actionTypes from "../actionTypes/actionTypes";

const employeeReducer = (state = initialState.employees, action) => {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEES:
      return Object.assign([], action.data);

    case actionTypes.ADD_EMPLOYEE:
      return [...state, action.data];

    case actionTypes.DISABLE_EMPLOYEE:
      return state.map(item => {
        if (item.rowNumber === action.data.disabledEmployeeRowNumber) {
          return Object.assign({}, item, {
            enddate: new Date()
          });
        }
        return item;
      });

    // case actionTypes.UPDATE_EMPLOYEE:
    //     debugger;
    //     return state.map((item) => {
    //         if (item.id === action.data.id) {
    //             return action.data;
    //         }
    //         return item
    //     });

    default:
      return state;
  }
};

export default employeeReducer;
