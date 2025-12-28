import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiStaff from "../apis/ApiStaff.js";

const initialState = {};

const staffSlice = createSlice({
  name: "staff",
  initialState,

  reducers: {
    resetStaff: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {},
});

// Export actions
export const { resetStaff } = staffSlice.actions;

// Export reducer
export default staffSlice.reducer;
