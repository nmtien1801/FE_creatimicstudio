import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiAuth from "../apis/ApiAuth.js";

const initialState = {
  userInfo: {},
  isLoading: false,
  hasCheckedAuth: false,
};

export const Login = createAsyncThunk(
  "auth/Login",
  async (data, thunkAPI) => {
    const response = await ApiAuth.LoginApi(data);
    return response;
  }
);

export const Register = createAsyncThunk(
  "auth/Register",
  async (data, thunkAPI) => {
    const response = await ApiAuth.RegisterApi(data);
    return response;
  }
);

export const GetAccount = createAsyncThunk(
  "auth/GetAccount",
  async (data, thunkAPI) => {
    const response = await ApiAuth.GetAccountApi(data);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Login
    builder
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
        }
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
      });

    // Register
    builder
      .addCase(Register.pending, (state) => { })
      .addCase(Register.fulfilled, (state, action) => { })
      .addCase(Register.rejected, (state, action) => { });

    // GetAccount
    builder
      .addCase(GetAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAccount.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
        }
        state.isLoading = false;
        state.hasCheckedAuth = true;
      })
      .addCase(GetAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.hasCheckedAuth = true;
      });
  },
});

// Export actions
export const { } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
