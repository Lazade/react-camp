import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface StoreState {
  loading: boolean,
  error: null | string,
  categoriesData: any,
  productsData: any
}

const initialState : StoreState = {
  loading: true,
  error: null,
  categoriesData: null,
  productsData: null
}

export const getCategoriesData = createAsyncThunk(
  'store/getCategoriesData',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(storeSlice.actions.fetchStart());
    try {
      const { data } = await axios.get('http://localhost:9000/api/categories');
      thunkAPI.dispatch(storeSlice.actions.fetchSuccess(data.data));
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(storeSlice.actions.fetchError(error.message));
      }
    }
  }
)

export const getProductsData = createAsyncThunk(
  'store/getProductsData',
  async (cateId: string = "", thunkAPI) => {
    
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
      state.categoriesData = action.payload;
    },
    fetchError: (state, action: PayloadAction<string|null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
});