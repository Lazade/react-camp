import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../store/";
import { persistConfig } from '../store';
import { getStoredState } from 'redux-persist';
import axios from "axios";
import { apiURL } from "../../config";

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
  async (data: { jwt: String | null, newCartItem: CartItem }, thunkAPI) => {
    const { jwt, newCartItem } = data;
    if (jwt === null) {
      try {
        const value = await getStoredState(persistConfig);
        if (value === undefined) {
          return thunkAPI.rejectWithValue("")
        }
        const currentCartState = value['cart'] as CartState;
        const currentCartItems = currentCartState.cartItems;
        let isAlreadyExisted = false
        currentCartItems.forEach((item) => {
          if (item.product.id === newCartItem.product.id) {
            isAlreadyExisted = true;
            item.quantity += newCartItem.quantity;
          }
        })
        if (isAlreadyExisted === false) {
          currentCartItems.push(newCartItem);
        }
        return currentCartItems;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      } 
    } else {
      const bodyData = {
        cart: {
          productId: newCartItem.product.id,
          quantity: newCartItem.quantity
        }
      };
      try {
        const response = await axios.patch(`${apiURL}/cart/add`, bodyData, {
          headers: {
            Authorization: `${jwt}`
          }
        });
        const { data, error } = response.data;
        if (error !== null) {
          return thunkAPI.rejectWithValue(error);
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
    }
  }
)

export const getCartFromLocal = createAsyncThunk(
  'Cart/getCartFromLocal',
  async (_, thunkAPI) => {
    try {
      const value = await getStoredState(persistConfig);
      if (value === undefined) {
        return thunkAPI.rejectWithValue("")
      }
      const currentCartState = value['cart'] as CartState;
      const currentCartItems = currentCartState.cartItems;
      return currentCartItems;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)

export const getUserCart = createAsyncThunk(
  'Cart/getUserCart',
  async (jwt: String, thunkAPI) => {
    try {
      const response = await axios.get(`${apiURL}/cart`, {
        headers: {
          Authorization: `${jwt}`
        }
      });
      const { data, error } = response.data;
      if (error !== null) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)

export const subtractAction = createAsyncThunk<CartItem[], {id: String, jwt: String | null}, {state: { cart: CartState }}>(
  'Cart/SubtractAction',
  async (info: { id: String, jwt: String | null }, thunkAPI) => {
    const { id, jwt } = info;
    const { cart } = thunkAPI.getState();
    let cartItems = cart.cartItems;
    let products = cartItems.filter(item => item.product.id === id).map(item => ({...item, quantity: (item.quantity > 1 ? item.quantity - 1 : item.quantity)}));
    const newCartItems = [
      ...products,
      ...cartItems.filter(item => item.product.id !== id)
    ]
    console.log(newCartItems);
    if (jwt === null) {
      return newCartItems;
    }
    const response = await axios.patch(`${apiURL}/cart/update`, { cart: newCartItems }, {
      headers: {
        Authorization: `${jwt}`
      }
    })
    const { data, error } = response.data;
    if (error !== null) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  }
)

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    updateCartItems: (state, action) => {
      console.log("updateCartItem");
      state.cartItems = action.payload;
    },
    updateState: (state) => {
      const cartItems = state.cartItems;
      const allQuantity = cartItems.length;
      const checkedCartItems = cartItems.filter((item) => { return item.isChecked });
      state.totalPrice = checkedCartItems.reduce((previous, current) => previous + (current.quantity * current.product.price.valueOf()) , 0);
      state.quantity = checkedCartItems.reduce((pre, cur) => pre + cur.quantity, 0);
      state.isAllChecked = allQuantity === checkedCartItems.length;
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
      state.loading = true;
      state.error = null;
    },
    [addToCart.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addToCart.fulfilled.type]: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    [getUserCart.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserCart.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      const cartItems = action.payload;
      const allQuantity = cartItems.length;
      const checkedCartItems = cartItems.filter((item) => { return item.isChecked });
      state.cartItems = action.payload;
      state.totalPrice = checkedCartItems.reduce((previous, current) => previous + (current.quantity * current.product.price.valueOf()) , 0);
      state.quantity = checkedCartItems.reduce((pre, cur) => pre + cur.quantity, 0);
      state.isAllChecked = allQuantity === checkedCartItems.length;
    },
    [getCartFromLocal.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCartFromLocal.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCartFromLocal.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      const cartItems = action.payload;
      const allQuantity = cartItems.length;
      const checkedCartItems = cartItems.filter((item) => { return item.isChecked });
      state.cartItems = action.payload;
      state.totalPrice = checkedCartItems.reduce((previous, current) => previous + (current.quantity * current.product.price.valueOf()) , 0);
      state.quantity = checkedCartItems.reduce((pre, cur) => pre + cur.quantity, 0);
      state.isAllChecked = allQuantity === checkedCartItems.length;
    },
    [subtractAction.pending.type]: (state) => {
      state.loading = true;
    },
    [subtractAction.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [subtractAction.fulfilled.type]: (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.error = null;
      state.cartItems = action.payload;
    }
  }
})