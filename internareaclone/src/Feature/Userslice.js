import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userslice.actions;

// Selector to get logged-in user
export const selectuser = (state) => state.user.user;

export default userslice.reducer;
