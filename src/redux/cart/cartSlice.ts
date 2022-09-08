import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string,
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    handlerAddToCart: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload
      state.cartItems = [...state.cartItems, newCartItem]
    },
  }
})