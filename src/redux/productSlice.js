import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiProduct from "../apis/ApiProduct.js";

const initialState = {
  ProductList: [],
  ProductTotal: 0,
  ProductDropdown: [],
};

export const getListProduct = createAsyncThunk(
  "product/getListProduct",
  async ({ page, limit }, thunkAPI) => {
    const response = await ApiProduct.getListProductApi(page, limit);
    return response;
  }
);

export const getListProductDropdown = createAsyncThunk(
  "product/getListProductDropdown",
  async (thunkAPI) => {
    const response = await ApiProduct.getListProductDropdownApi();
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    resetProduct: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // getListProduct
    builder
      .addCase(getListProduct.pending, (state) => {})
      .addCase(getListProduct.fulfilled, (state, action) => {
        state.ProductList = action.payload.DT.products;
        state.ProductTotal = action.payload.DT.total;
      })
      .addCase(getListProduct.rejected, (state, action) => {});

    // getListProductDropdown
    builder
      .addCase(getListProductDropdown.pending, (state) => {})
      .addCase(getListProductDropdown.fulfilled, (state, action) => {
        state.ProductDropdown = action.payload.DT;
      })
      .addCase(getListProductDropdown.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetProduct } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
