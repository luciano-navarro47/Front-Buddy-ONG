import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  // POST_PRODUCT,
  // UPDATE_PRODUCT,
  // DELETE_PRODUCT,
  // SHOP_FILTER_VALUE,
  // SHOP_SEARCH_INPUT_NAME,
} from "../../redux/ActionTypes";

const initialState = {
  allProducts: [],
  product: {}
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      }
    // case POST_PRODUCT:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
}
