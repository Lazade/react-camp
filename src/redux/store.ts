import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "./store/";
import { purchaseSlice } from "./purchase";

interface CommonState {
  hasScrollUp: boolean
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
  purchase: purchaseSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;