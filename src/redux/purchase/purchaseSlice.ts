import { createSlice } from "@reduxjs/toolkit";

interface PurchaseState {
  isScroll: boolean,
  hasSubmit: boolean
}

const initialState: PurchaseState = {
  isScroll: false,
  hasSubmit: false
}

export const purchaseSlice = createSlice({
  name: 'Purchase',
  initialState,
  reducers: {
    updateIsScroll: (state, action) => {
      state.isScroll = action.payload
    }
  }
});