import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "./store/";

const rootReducer = combineReducers({
  store: storeSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;