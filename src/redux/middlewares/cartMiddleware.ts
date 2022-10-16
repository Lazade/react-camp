import { cartSlice } from "../cart";

export const cartMiddleware = storeAPI => next => action => {
  if (action.type === 'Cart/handleRemoveAllButtonAction') {
    storeAPI.dispatch(cartSlice.actions.updateState());
    return next(action);
  } else {
    return next(action);
  }
}