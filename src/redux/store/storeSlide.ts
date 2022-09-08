import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../config';

export interface StoreState {
  loading: boolean,
  error: null | string,
  currentCategory: string,
  categoriesData: null | CategoryData[],
  productsData: null | ProductData[],
  filtedProductsData: null | ProductData[],
  countOfLessThan5000: number,
  countOfFrom5000To10000: number,
  countOfFrom10001To20000: number,
  countOfFrom20001To30000: number,
  countOfGreaterThan30000: number
  // filters
  isShowInStock: null | boolean,
  priceRange: null | '<5000' | '5001~10000' | '10001~20000' | '20001~30000' | '>30000'
}

export interface CategoryData {
  name: string,
  id: string
}

export interface ProductData {
  id: string,
  category: string,
  name: string,
  description: string,
  thumbnail: string,
  price: Number,
  isOnSale: boolean,
  isNewArrival: boolean,
  isInStock: boolean,
}

const initialState : StoreState = {
  loading: true,
  error: null,
  currentCategory: "",
  categoriesData: null,
  productsData: null,
  filtedProductsData: null,
  countOfLessThan5000: 0,
  countOfFrom5000To10000: 0,
  countOfFrom10001To20000: 0,
  countOfFrom20001To30000: 0,
  countOfGreaterThan30000: 0,
  isShowInStock: null,
  priceRange: null
}

export const getProductsAndCategoriesData = createAsyncThunk(
  'store/getProductsAndCategoriesData',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(storeSlice.actions.fetchStart());
    try {
      const { data } = await axios.get(`${apiURL}/products-and-categories`);
      thunkAPI.dispatch(storeSlice.actions.fetchSuccess(data));
      thunkAPI.dispatch(storeSlice.actions.initialData());
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
      thunkAPI.dispatch(storeSlice.actions.initialData());
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(storeSlice.actions.fetchError(error.message));
      }
    }
  }
)

// const initialData = (state: )

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
    fetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    initialData: (state) => {
      if (state.productsData !== null) {
        const productsData = state.productsData
        state.filtedProductsData = productsData
        state.priceRange = null
        state.isShowInStock = null
        let countOfLessThan5000 = 0
        let countOfFrom5000To10000 = 0
        let countOfFrom10001To20000 = 0
        let countOfFrom20001To30000 = 0
        let countOfGreaterThan30000 = 0
        // productsData.map((data) => {
        productsData.forEach((data) => {
          if (data.price <= 5000) {
            countOfLessThan5000 += 1
          } else if (data.price <= 10000) {
            countOfFrom5000To10000 += 1
          } else if (data.price <= 20000) {
            countOfFrom10001To20000 += 1
          } else if (data.price <= 30000) {
            countOfFrom20001To30000 += 1
          } else {
            countOfGreaterThan30000 += 1
          }
        })
        state.countOfLessThan5000 = countOfLessThan5000
        state.countOfFrom5000To10000 = countOfFrom5000To10000
        state.countOfFrom10001To20000 = countOfFrom10001To20000
        state.countOfFrom20001To30000 = countOfFrom20001To30000
        state.countOfGreaterThan30000 = countOfGreaterThan30000
      }
    },
    categoryActionHandler: (state, action) => {
      if (action.payload === "") {
        state.currentCategory = ""
      } else {
        state.currentCategory = action.payload
      }
    },
    setIsShowInStock: (state, action) => {
      state.isShowInStock = action.payload
      const isShowInStock = state.isShowInStock
      const productsData = state.productsData
      if (isShowInStock === null) {
        state.filtedProductsData = productsData
      } else {
        if (productsData !== null) {
          state.filtedProductsData = productsData.filter((data) => { return data.isInStock === isShowInStock })
        }
      }
    },
    setPriceRangeHandler: (state, action) => {
      state.priceRange = action.payload
      const priceRange = state.priceRange
      const productsData = state.productsData
      let min: number, max: number
      if (priceRange === null) {
        state.filtedProductsData = productsData
      } else {
        switch (priceRange) {
          case '<5000':
            min = 0
            max = 5000
            break
          case '5001~10000':
            min = 5001
            max = 10000
            break
          case '10001~20000':
            min = 10001
            max = 20000
            break
          case '20001~30000':
            min = 20001
            max = 30000
            break
          case '>30000':
            min = 30001
            max = 999999999
            break
        }
        if (productsData !== null) {
          state.filtedProductsData = productsData.filter((data) => {  return (data.price >= min && data.price <= max) })
        }
      }
    },
  }
});