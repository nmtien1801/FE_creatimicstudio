import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiCart from "../apis/ApiCart";

const STORAGE_KEY = "guestCart";

const readGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const initialState = { items: readGuestCart(), isLoading: false };

export const loadCart = createAsyncThunk("cart/loadCart", async (userId) => {
  if (!userId) return readGuestCart();
  const response = await ApiCart.getCartApi();
  return response?.DT || [];
});

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ item, userId }) => {
    if (userId) {
      await ApiCart.addCartApi(item.id, item.quantity || 1);
      const response = await ApiCart.getCartApi();
      return response?.DT || [];
    }
    return item;
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ item, quantity, userId }) => {
    if (userId) {
      await ApiCart.updateCartApi(item.id, quantity);
      const response = await ApiCart.getCartApi();
      return response?.DT || [];
    }
    return { ...item, quantity };
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ item, userId }) => {
    if (userId) {
      await ApiCart.removeCartApi(item.cartItemId || item.id);
      const response = await ApiCart.getCartApi();
      return response?.DT || [];
    }
    return item.id;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.items = action.payload;
        else {
          const existing = state.items.find(
            (entry) => entry.id === action.payload.id,
          );
          if (existing) existing.quantity += action.payload.quantity || 1;
          else
            state.items.push({
              ...action.payload,
              quantity: action.payload.quantity || 1,
            });
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.items = action.payload;
        else {
          const entry = state.items.find(
            (item) => item.id === action.payload.id,
          );
          if (entry) entry.quantity = action.payload.quantity;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload)
          ? action.payload
          : state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const persistGuestCart = (items) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
export default cartSlice.reducer;
