import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
  isShowCreatePostModal: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    findPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setShowCreatePostModal: (state, action) => {
      state.isShowCreatePostModal = action.payload;
    },
  },
});

export const { findPost, setShowCreatePostModal } = postSlice.actions;

export default postSlice.reducer;
