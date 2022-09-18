import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../config";

export interface UserState {
  loading: boolean;
  error: null | string;
  token: null | string;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signin = createAsyncThunk(
  "user/signin",
  async (
    params: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post("http://localhost:8000/api/signin", {
      email: params.email,
      password: params.password,
    });
    return data.token;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   state.loading = true;
    // },
    // fetchSuccess: (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   const { products, categories } = action.payload;
    //   state.categoriesData = categories;
    //   state.productsData = products;
    // },
    // fetchCategoryProductsSuccess: (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.productsData = action.payload;
    // },
    // fetchError: (state, action: PayloadAction<string | null>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // categoryActionHandler: (state, action) => {
    //   if (action.payload === "") {
    //     state.currentCategory = "";
    //   } else {
    //     state.currentCategory = action.payload;
    //   }
    // },
  },
  extraReducers: {
    [signin.pending.type]: (state) => {
      state.loading = true;
    },
    [signin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload;
    },
    [signin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
