import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  editingEmployee: {},
  isUpdate: false,
  penalties: [],
  bonuses: [],
  loans: [],
  reports: [],
  salaries: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees = action.payload;
    },
    updateEmployees: (state) => {
      state.isUpdate = !state.isUpdate;
    },
    editEmployee: (state, action) => {
      state.editingEmployee = action.payload;
    },
    addPenalty: (state, action) => {
      if (Object.keys(action.payload).length > 0) {
        state.penalties = [...state.penalties, action.payload];
      } else {
        state.penalties = [];
      }
    },
    addBonus: (state, action) => {
      if (Object.keys(action.payload).length > 0) {
        state.bonuses = [...state.bonuses, action.payload];
      } else {
        state.bonuses = [];
      }
    },
    addLoan: (state, action) => {
      state.loans = action.payload;
    },
    addReport: (state, action) => {
      state.reports = action.payload;
    },
    addSalary: (state, action) => {
      state.salaries = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addEmployee,
  updateEmployees,
  addPenalty,
  editEmployee,
  addBonus,
  addLoan,
  addReport,
  addSalary,
} = employeesSlice.actions;

export default employeesSlice.reducer;
