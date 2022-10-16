import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "./store/";
import { authSlice } from "./auth/";
import { purchaseSlice } from "./purchase";
import { productSlice } from './product';
import { cartSlice } from './cart';
import { orderSlice } from "./order";
import { cartMiddleware, productMiddleware } from "./middlewares";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

interface CommonState {
  hasScrollUp: boolean;
  showHeaderDropDownMenu: boolean,
}

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const initialState: CommonState = {
  hasScrollUp: false,
  showHeaderDropDownMenu: false
};

export const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    updateHasScrollUp: (state, action) => {
      state.hasScrollUp = action.payload;
    },
    toggleShowHeaderDropDownMenu: (state, action) => {
      state.showHeaderDropDownMenu = action.payload
    }
  },
});

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  store: storeSlice.reducer,
  purchase: purchaseSlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  user: authSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [cartMiddleware, productMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(middlewares);
  },
});

const persistor = persistStore(store, null, () => {
  // console.log("????");
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
