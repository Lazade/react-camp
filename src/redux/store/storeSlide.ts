import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../config';

export interface StoreState {
  loading: boolean,
  error: null | string,
  currentCategory: string,
  categoriesData: null | CategoryData[],
  productsData: ProductData[],
  filtedProductsData: ProductData[],
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
  productsData: [],
  filtedProductsData: [],
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
    const response = await axios.get(`${apiURL}/products-and-categories`);
    const { data, error } = response.data;
    if (error !== null) {

    } 
    return data;
  }
)

export const getProductsOfCurrentCategory = createAsyncThunk(
  'store/getProductsOfCurrentCategory',
  async (cateid: string, thunkAPI) => {
    const { data } = await axios.get(`${apiURL}/products/${cateid}`);
    return data.data;
  }
)

export const storeSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    categoryActionHandler: (state, action) => {
      if (action.payload === "") {
        state.currentCategory = ""
      } else {
        state.currentCategory = action.payload
      }
    },
    setIsShowInStock: (state, action: PayloadAction<boolean | null>) => {
      const isShowInStock = action.payload
      state.isShowInStock = action.payload
      const productsData = state.productsData
      if (isShowInStock === null) {
        state.filtedProductsData = state.productsData
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
  },
  extraReducers: {
    [getProductsAndCategoriesData.pending.type]: (state) => {
      state.loading = true
    },
    [getProductsAndCategoriesData.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getProductsAndCategoriesData.fulfilled.type]: (state, action: PayloadAction<{products: ProductData[], categories: CategoryData[]}>) => {
      state.loading = false
      state.error = null
      const { products, categories } = action.payload;
      state.categoriesData = categories;
      state.productsData = products;
      state.filtedProductsData = products;
      state.priceRange = null
      state.isShowInStock = null
      state.countOfLessThan5000 = products.filter((product) => { return product.price <= 5000}).length
      state.countOfFrom5000To10000 = products.filter((product) => { return (product.price > 5000 && product.price <= 10000) }).length
      state.countOfFrom10001To20000 = products.filter((product) => { return (product.price > 10000 && product.price <= 20000) }).length
      state.countOfFrom20001To30000 = products.filter((product) => { return (product.price > 20000 && product.price <= 30000) }).length
      state.countOfGreaterThan30000 = products.filter((product) => { return product.price > 30000 }).length
    },
    [getProductsOfCurrentCategory.pending.type]: (state) => {
      state.loading = true
    },
    [getProductsOfCurrentCategory.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getProductsOfCurrentCategory.fulfilled.type]: (state, action: PayloadAction<ProductData[]>) => {
      state.loading = false;
      state.error = null;
      state.productsData = action.payload;
      const products = action.payload;
      state.filtedProductsData = products;
      state.priceRange = null
      state.isShowInStock = null
      state.countOfLessThan5000 = products.filter((product) => { return product.price <= 5000}).length
      state.countOfFrom5000To10000 = products.filter((product) => { return (product.price > 5000 && product.price <= 10000) }).length
      state.countOfFrom10001To20000 = products.filter((product) => { return (product.price > 10000 && product.price <= 20000) }).length
      state.countOfFrom20001To30000 = products.filter((product) => { return (product.price > 20000 && product.price <= 30000) }).length
      state.countOfGreaterThan30000 = products.filter((product) => { return product.price > 30000 }).length
    }
  }
});