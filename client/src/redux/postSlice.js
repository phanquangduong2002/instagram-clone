import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    findPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});

export const { findPost } = postSlice.actions;

export default postSlice.reducer;
