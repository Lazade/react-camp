// import { getState } from '@reduxjs/toolkit'
import { getStoredState } from 'redux-persist'
import { cartSlice } from '../cart'

export const cartMiddleware = storeAPI => next => action => {
  if (action.type === cartSlice.actions.handlerAddToCart.type) {

  } 
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}