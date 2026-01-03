import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staffReducer from "./staffSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
