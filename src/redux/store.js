import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staffReducer from "./staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
  },
});
