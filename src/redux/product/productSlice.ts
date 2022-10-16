import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductData, CategoryData } from "../store/";
import { apiURL } from "../../config";

interface ProductState {
  loading: boolean,
  error: null | string,
  productData: null | ProductData,
  categoryData: null | CategoryData,
  currentImage: null | string,
  displayImages: string[],
  selectedQuantity: number,
}

const initialState : ProductState = {
  loading: true,
  error: null,
  productData: null,
  categoryData: null,
  currentImage: null,
  displayImages: [],
  selectedQuantity: 1
}

export const getProduct = createAsyncThunk(
  'Product/getProduct',
  async (id: string, thunkAPI) => {
    const response = await axios.get(`${apiURL}/product/${id}`);
    const { data, error } = response.data;
    if (error !== null) {
      return thunkAPI.rejectWithValue(error);
    }
    return data
  }
)

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload
    },
    setDisplayImages: (state, action) => {
      state.displayImages = action.payload
      if (state.displayImages.length > 0) {
        state.currentImage = state.displayImages[0]
      }
    },
    selectedQuantityChange: (state, action) => {
      state.selectedQuantity = action.payload
    },
  },
  extraReducers: {
    [getProduct.pending.type]: (state) => {
      state.loading = true
      state.currentImage = null
    },
    [getProduct.fulfilled.type]: (state, action) => {
      const { productData, categoryData } = action.payload
      state.loading = false
      state.error = null
      state.productData = productData
      state.categoryData = categoryData
    },
    [getProduct.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})