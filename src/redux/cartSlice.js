import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiCart from "../apis/ApiCart";

const STORAGE_KEY = "cartItems";

const readGuestCart = () => {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

const initialState = { items: readGuestCart(), isLoading: false };

const getServerCart = async () => {
  const response = await ApiCart.getCartApi();
  if (response?.EC !== 0 || !Array.isArray(response.DT)) {
    throw new Error(response?.EM || "Không thể tải giỏ hàng");
  }
  return response.DT;
};

export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (userId) => {
    if (!userId) return readGuestCart();

    let guestItems = readGuestCart();
    let serverItems = await getServerCart();
    if (guestItems.length === 0) return serverItems;

    while (guestItems.length > 0) {
      const guestItem = guestItems[0];
      const response = await ApiCart.addCartApi(
        guestItem.id,
        guestItem.quantity || 1,
      );
      if (response?.EC !== 0) {
        throw new Error(response?.EM || "Không thể đồng bộ giỏ hàng");
      }

      guestItems = guestItems.slice(1);
      persistGuestCart(guestItems);
    }

    serverItems = await getServerCart();
    return serverItems;
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ item, userId }, { getState }) => {
    if (userId) {
      const response = await ApiCart.addCartApi(item.id, item.quantity || 1);
      if (response?.EC !== 0) {
        throw new Error(response?.EM || "Không thể thêm sản phẩm vào giỏ hàng");
      }
      return getServerCart();
    }
    const items = getState().cart.items;
    const existing = items.find((entry) => entry.id === item.id);
    const nextItems = existing
      ? items.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + (item.quantity || 1) }
            : entry,
        )
      : [...items, { ...item, quantity: item.quantity || 1 }];
    persistGuestCart(nextItems);
    return nextItems;
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ item, quantity, userId }, { getState }) => {
    if (userId) {
      const response = await ApiCart.updateCartApi(
        item.cartItemId || item.id,
        quantity,
      );
      if (response?.EC !== 0) {
        throw new Error(response?.EM || "Không thể cập nhật giỏ hàng");
      }
      return getServerCart();
    }
    const nextItems = getState().cart.items.map((entry) =>
      entry.id === item.id ? { ...entry, quantity } : entry,
    );
    persistGuestCart(nextItems);
    return nextItems;
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ item, userId }, { getState }) => {
    if (userId) {
      const response = await ApiCart.removeCartApi(item.cartItemId || item.id);
      if (response?.EC !== 0) {
        throw new Error(response?.EM || "Không thể xóa sản phẩm");
      }
      return getServerCart();
    }
    const nextItems = getState().cart.items.filter(
      (entry) => entry.id !== item.id,
    );
    persistGuestCart(nextItems);
    return nextItems;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    purchasedItemsRemoved: (state, action) => {
      const purchasedIds = new Set(action.payload.map(String));
      state.items = state.items.filter(
        (item) => !purchasedIds.has(String(item.id)),
      );
    },
  },
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
        state.items = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const removePurchasedItems = (productIds) => (dispatch) => {
  const purchasedIds = new Set(productIds.map(String));
  persistGuestCart(
    readGuestCart().filter((item) => !purchasedIds.has(String(item.id))),
  );
  dispatch(cartSlice.actions.purchasedItemsRemoved(productIds));
};
export const persistGuestCart = (items) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
export default cartSlice.reducer;
