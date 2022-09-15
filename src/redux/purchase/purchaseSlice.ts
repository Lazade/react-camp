import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiURL } from "../../config";
import { checkoutAction } from '../cart'

interface OrderData {
  _id: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  costPrice: number,
  totalQuantity: number,
  orderItems: OrderItem[],
  status: string
}

interface OrderItem {
  cost: number,
  quantity: number,
  _id: string,
  price: number,
  thumbnail: string,
  name: string
}

interface PurchaseState {
  isScroll: boolean,
  hasSubmit: boolean,
  loading: boolean,
  currentOrder: null | OrderData,
}

const initialState: PurchaseState = {
  isScroll: false,
  hasSubmit: false,
  loading: false,
  currentOrder: null
}

export const getOrder = createAsyncThunk(
  'purchase/getOrder',
  async (orderId: string, thunkAPI) => {
    const { data } = await axios.get(`${apiURL}/order/${orderId}`);
    return data.data;
  }
)

export const purchaseSlice = createSlice({
  name: 'Purchase',
  initialState,
  reducers: {
    updateIsScroll: (state, action) => {
      state.isScroll = action.payload
    }
  },
  extraReducers: {
    [getOrder.pending.type]: (state) => {
      state.loading = true
    },
    [getOrder.rejected.type]: (state, action) => {
      state.loading = false
    },
    [getOrder.fulfilled.type]: (state, action) => {
      state.loading = false
      state.currentOrder = action.payload
    },
  }
});