import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../store/";
import axios from "axios";
import { apiURL } from "../../config";
import { redirect } from "react-router-dom";

export interface CartItem {
  // productId: string,
  product: ProductData
  quantity: number,
  isChecked: boolean
}

interface CartState {
  cartItems: CartItem[],
  isAllChecked: boolean,
  totalPrice: number,
  quantity: number,
  loading: boolean,
  error: string | null,
  continueActionLoading: boolean,
}

const initialState: CartState = {
  cartItems: [],
  isAllChecked: false,
  totalPrice: 0,
  quantity: 0,
  loading: true,
  error: null,
  continueActionLoading: false
}

export const checkoutAction = createAsyncThunk(
  'cart/checkoutAction',
  async (cartItems: CartItem[], thunkAPI) => {
    const purchasingItems = cartItems.filter((item) => item.isChecked)
                                      .map((item) => { return {
                                        productId: item.product.id, quantity: item.quantity, price: (item.quantity * item.product.price.valueOf())
                                      }})
    const { data } = await axios.post(`${apiURL}/order`, { orderItems: purchasingItems, userId: '630c1191e9ff85c27667201f' });
    return data;
  } 
)

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    updateState: (state) => {
      const cartItems = state.cartItems;
      const allQuantity = cartItems.length;
      const checkedCartItems = cartItems.filter((item) => { return item.isChecked })
      state.totalPrice = checkedCartItems.reduce((previous, current) => previous + (current.quantity * current.product.price.valueOf()) , 0);
      state.quantity = checkedCartItems.reduce((pre, cur) => pre + cur.quantity, 0);
      state.isAllChecked = allQuantity === checkedCartItems.length
    },
    handlerAddToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload)
    },
    handleSelectAllButtonAction: (state, action: PayloadAction<boolean>) => {
      state.cartItems.forEach((item) => {
        item.isChecked = action.payload
      })
    },
    handleCheckButtonAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems.forEach((item) => {
        if (item.product.id === id) {
          item.isChecked = !item.isChecked
        }
      })
    },
    handleSubtractButtonAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems.forEach((item) => {
        if (item.product.id === id) {
          const qty = item.quantity;
          if (qty > 1) {
            item.quantity -= 1;
          }
        }
      })
    },
    handlePlusButtonAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems.forEach((item) => {
        if (item.product.id === id) {
          const qty = item.quantity;
          if (qty < 10) {
            item.quantity += 1;
          }
        }
      })
    },
    handleQuantityValueChange: (state, action: PayloadAction<{id: string, newQuantity: number}>) => {
      const { id, newQuantity } = action.payload;
      state.cartItems.forEach((item) => {
        if (item.product.id === id) {
          if (newQuantity >= 10) {
            item.quantity = 10;
          } else if (newQuantity < 0) {
            item.quantity = 0
          } else if (Number.isNaN(newQuantity)) {
            item.quantity = 1;
          } else {
            item.quantity = newQuantity;
          }
        }
      })
    },
  },
  extraReducers: {
    [checkoutAction.pending.type]: (state) => {
      state.continueActionLoading = true;
      state.error = null;
    },
    [checkoutAction.rejected.type]: (state, action: PayloadAction<string>) => {
      state.continueActionLoading = false;
      state.error = action.payload;
    },
    [checkoutAction.fulfilled.type]: (state, action) => {
      state.continueActionLoading = false
      const { orderId } = action.payload;
      console.log(orderId);
      redirect(`placeOrder/${orderId}`);
    }
  }
})