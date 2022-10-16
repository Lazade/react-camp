import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../config";

export interface UserState {
  loading: boolean;
  error: null | string;
  accessToken: null | string;
  refreshToken: null | string;
  userName: null | string;
  email: null | string;
}

const initialState: UserState = {
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  userName: null,
  email: null,
};

export const signin = createAsyncThunk(
  "User/signin",
  async (
    params: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const response = await axios.post(`${apiURL}/signin`, {
      email: params.email,
      password: params.password,
    });
    const { data, error } = response.data;
    if (error !== null) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  }
);

export const authSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logOut: (state) => {
      // backend ?
      state.loading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = null;
      state.email = null;
    },
  },
  extraReducers: {
    [signin.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signin.fulfilled.type]: (state, action) => {
      // console.log(action);
      state.loading = false;
      state.error = null;
      state.accessToken = action.payload.tokens.access;
      state.refreshToken = action.payload.tokens.refresh;
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
    },
    [signin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
