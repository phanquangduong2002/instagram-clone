import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    changeProfile: (state, action) => {
      state.currentUser.profilePicture = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  changeProfile,
  updateCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
