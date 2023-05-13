import { CART_ACTION_TYPES } from "./cart.types";

//Definig initial state
export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
  };
    
  //Reducer
  export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch(type) {
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload,
        };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
          return {
            ...state,
            cartItems: payload,
          };
      default: 
      return state;
    }
  };