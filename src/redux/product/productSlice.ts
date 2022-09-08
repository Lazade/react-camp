import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductData, CategoryData } from "../store/";
import { apiURL } from "../../config";

interface ProductState {
  loading: boolean,
  error: null | string,
  productData: null | ProductData,
  categoryData: null | CategoryData
}

const initialState : ProductState = {
  loading: true,
  error: null,
  productData: null,
  categoryData: null
}

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    fecthStart: (state) => {
      state.loading = true
    },
  },
})