import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_CART(state, action) {
      const { id, product, quantity } = action.payload;
      const existingItem = state.listCart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.listCart.push({ id, product, quantity });
      }
    },
    UPDATE_CART(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.listCart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    DELETE_CART(state, action) {
      const id = action.payload;
      state.listCart = state.listCart.filter((item) => item.id !== id);
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
