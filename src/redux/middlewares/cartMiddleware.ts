import { cartSlice } from "../cart";

export const cartMiddleware = storeAPI => next => action => {
  // console.log('dispatching', action)
  // let result = next(action)
  // console.log('next state', storeAPI.getState())
  // return result
  if (action.type === 'Cart/handleRemoveAllButtonAction') {
    console.log("???")
    storeAPI.dispatch(cartSlice.actions.updateState());
  }
  return next(action);
}