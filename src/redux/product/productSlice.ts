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
  'product/getProduct',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(productSlice.actions.fecthStart())
    try {
      const { data } = await axios.get(`${apiURL}/product/${id}`)
      thunkAPI.dispatch(productSlice.actions.fetchSuccess(data))
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(productSlice.actions.fetchError(error.message))
      }
    }
  }
)

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    fecthStart: (state) => {
      state.loading = true
      state.currentImage = null
    },
    fetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchSuccess: (state, action) => {
      const { productData, categoryData } = action.payload
      state.loading = false
      state.error = null
      state.productData = productData
      state.categoryData = categoryData
    },
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
    // pending: ()
  }
})