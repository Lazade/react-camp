import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiURL } from "../../config";
import { OrderData } from '../order';

interface PurchasingOrderData extends OrderData {
  purchaseInfo: PurchaseInfo | null
}

interface PurchaseInfo {
  email: string,
  name: string,
  creditCardNumber: string,
  expireDate: string
}

interface PrePurchaseInfo extends PurchaseInfo {
  cvv: string
}

interface PurchaseState {
  isScroll: boolean,
  hasSubmit: boolean,
  loading: boolean,
  currentOrder: null | PurchasingOrderData,
  prePurchaseInfo: PrePurchaseInfo,
  formError: string | null
}

const initialState: PurchaseState = {
  isScroll: false,
  hasSubmit: false,
  loading: false,
  currentOrder: null,
  prePurchaseInfo: {name: "", email: "", creditCardNumber: "", expireDate: "", cvv: ""},
  formError: null
}

export const getOrder = createAsyncThunk(
  'purchase/getOrder',
  async (orderId: string, thunkAPI) => {
    const { data } = await axios.get(`${apiURL}/order/${orderId}`);
    return data.data;
  }
)

export const payOrder = createAsyncThunk(
  'purchase/payOrder',
  async (reqData: { orderId: string, prePurchaseInfo: PrePurchaseInfo }, thunkAPI) => {
    const { orderId, prePurchaseInfo } = reqData;
    const response = await axios.patch(`${apiURL}/order/${orderId}/pay`, prePurchaseInfo);
    const { data, error } = response.data;
    if (error === null) {
      thunkAPI.dispatch(getOrder(orderId));
    }
  }
)

export const cancelOrder = createAsyncThunk(
  'purchase/cancelOrder',
  async (orderId: string, thunkAPI) => {
    const response = await axios.patch(`${apiURL}/order/${orderId}/cancel`);
    const { data, error } = response.data;
    if (error === null) {
      thunkAPI.dispatch(getOrder(orderId));
    }
  }
)

export const purchaseSlice = createSlice({
  name: 'Purchase',
  initialState,
  reducers: {
    updateIsScroll: (state, action) => {
      state.isScroll = action.payload;
    },
    handleNameInputChange: (state, action: PayloadAction<string>) => {
      state.prePurchaseInfo.name = action.payload;
    },
    handleEmailInputChange: (state, action) => {
      const email = action.payload;
      state.prePurchaseInfo.email = email;
    },
    handleCreditCardNumberInputChange: (state, action) => {
      state.prePurchaseInfo.creditCardNumber = action.payload;
    },
    handleExpiredDateInputChange: (state, action) => {
      state.prePurchaseInfo.expireDate = action.payload;
    },
    handleCvvInputChange: (state, action) => {
      state.prePurchaseInfo.cvv = action.payload;
    }
  },
  extraReducers: {
    [getOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrder.rejected.type]: (state, action) => {
      state.loading = false;
    },
    [getOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    },
    [payOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [payOrder.rejected.type]: (state, action) => {
      state.loading = false;
    },
    [payOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
    }
  }
});