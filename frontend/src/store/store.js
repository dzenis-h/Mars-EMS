import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import employeesReducer from "./slices/employeesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
  },
});
