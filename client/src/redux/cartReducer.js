import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  orders: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    placeOrder: (state, action) => {
      if (!state.orders) state.orders = [];
      state.orders.unshift(action.payload);
      if (!action.payload.keepCart) {
        state.products = [];
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  resetCart,
  placeOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
