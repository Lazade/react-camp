import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../config";

export interface OrderItem {
  cost: number,
  quantity: number,
  _id: string,
  price: number,
  thumbnail: string,
  name: string
}

export interface OrderData {
  _id: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  costPrice: number,
  totalQuantity: number,
  orderItems: OrderItem[],
  status: string,
}

interface OrderListState {
  orderDatas: OrderData[],
  isLoading: boolean,
  error: string | null,
}

const initialState: OrderListState = {
  orderDatas: [],
  isLoading: false,
  error: null
}

export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  async (jwt: string, thunkAPI) => {
    const response = await axios.get(`${apiURL}/orders`, {
      headers: {
        Authorization: `${jwt}`
      }
    });
    const { data, error } = response.data;
    if (error !== null) {
      thunkAPI.rejectWithValue(error)
    } else {
      return data;
    }
  }
)

export const orderSlice = createSlice({
  name: "OrderList",
  initialState,
  reducers: {
    errorHandler: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {
    [getOrderList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getOrderList.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getOrderList.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.orderDatas = action.payload;
    }
  }
})