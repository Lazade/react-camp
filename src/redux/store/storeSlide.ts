import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../config';

export interface StoreState {
  loading: boolean,
  error: null | string,
  currentCategory: string,
  categoriesData: any,
  productsData: any
}

const initialState : StoreState = {
  loading: true,
  error: null,
  currentCategory: "",
  categoriesData: null,
  productsData: null
}

export const getProductsAndCategoriesData = createAsyncThunk(
  'store/getProductsAndCategoriesData',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(storeSlice.actions.fetchStart());
    try {
      const { data } = await axios.get(`${apiURL}/products-and-categories`);
      thunkAPI.dispatch(storeSlice.actions.fetchSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(storeSlice.actions.fetchError(error.message));
      }
    }
  }
)

export const getProductsOfCurrentCategory = createAsyncThunk(
  'store/getProductsOfCurrentCategory',
  async (cateid: string, thunkAPI) => {
    thunkAPI.dispatch(storeSlice.actions.fetchStart());
    try {
      const { data } = await axios.get(`${apiURL}/products/${cateid}`)
      // console.log(data.data)
      thunkAPI.dispatch(storeSlice.actions.fetchCategoryProductsSuccess(data.data));
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(storeSlice.actions.fetchError(error.message));
      }
    }
  }
)

export const storeSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const { products, categories } = action.payload;
      state.categoriesData = categories;
      state.productsData = products;
    },
    fetchCategoryProductsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.productsData = action.payload;
    },
    fetchError: (state, action: PayloadAction<string|null>) => {
      state.loading = false
      state.error = action.payload
    },
    categoryActionHandler: (state, action) => {
      if (action.payload === "") {
        state.currentCategory = ""
      } else {
        state.currentCategory = action.payload
      }
    }
  }
});