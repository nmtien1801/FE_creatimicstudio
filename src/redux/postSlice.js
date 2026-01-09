import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiPost from "../apis/ApiPost.js";

const initialState = {
};

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    resetPost: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {},
});

// Export actions
export const { resetPost } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
