import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("token") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = true;
      localStorage.setItem("token", action?.payload?.token);
    },
    logout: (state) => {
      state.value = false;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
