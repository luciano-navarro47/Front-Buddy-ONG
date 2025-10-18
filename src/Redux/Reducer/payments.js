import { CREATE_CHECKOUT, CREATE_CHECKOUT_ERROR } from "redux/ActionTypes";

const initialState = {
  checkoutUrl: null,
  checkoutError: null,
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return {
        ...state,
        checkoutUrl: action.payload,
        checkoutError: null,
      };
    case CREATE_CHECKOUT_ERROR:
      return {
        ...state,
        checkoutUrl: null,
        checkoutError: action.payload,
      };
    default:
      return state;
  }
}
