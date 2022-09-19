import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../store/";
import { persistConfig } from '../store';
import { getStoredState } from 'redux-persist';

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

export const addToCart = createAsyncThunk(
  'Cart/addToCart',
  async (item: CartItem, thunkAPI) => {
    const value = await getStoredState(persistConfig);
    if (value) {
      return {
        currentCartState: value['cart'] as CartState,
        newCartItem: item
      }
    }
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
      // how to update state, 
      // how to sync the state across different tabs
      state.cartItems.push(action.payload);
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
    handleRemoveButtonAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.cartItems.findIndex((item) => item.product.id === id);
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
    },
    handleRemoveAllButtonAction: (state) => {
      state.cartItems = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.isAllChecked = false;
    },
    checkoutFetchStart: (state) => {
      state.continueActionLoading = true;
      state.error = null;
    },
    checkoutFetchError: (state, action: PayloadAction<string>) => {
      state.continueActionLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {
    [addToCart.pending.type]: (state) => {

    },
    [addToCart.rejected.type]: (state) => {

    },
    [addToCart.fulfilled.type]: (state, action: PayloadAction<{ currentCartState: CartState, newCartItem: CartItem }>) => {
      const { currentCartState, newCartItem } = action.payload;
      currentCartState.cartItems.push(newCartItem);
      state.cartItems = currentCartState.cartItems;
    }
  }
})