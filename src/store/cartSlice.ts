import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../types/types";

const initialState: { cart: Cart[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemsInCart: (state, action: PayloadAction<Cart[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { itemsInCart } = cartSlice.actions;
export default cartSlice.reducer;
