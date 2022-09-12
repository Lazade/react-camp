import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "./store/";
import { purchaseSlice } from "./purchase";
import { productSlice } from './product';
import { cartSlice } from './cart';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 
interface CommonState {
  hasScrollUp: boolean
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["cart"]
}

const initialState: CommonState = {
  hasScrollUp: false
}

export const commonSlice = createSlice({
  name: 'Common',
  initialState,
  reducers: {
    updateHasScrollUp: (state, action) => {
      state.hasScrollUp = action.payload;
    }
  }
})

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  store: storeSlice.reducer,
  purchase: purchaseSlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };