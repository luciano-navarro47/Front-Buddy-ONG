import {
  GET_ALL_PRODUCTS,
//   GET_PRODUCT_DETAIL,
//   POST_PRODUCT,
//   UPDATE_PRODUCT,
//   DELETE_PRODUCT,
//   SHOP_FILTER_VALUE,
//   SHOP_SEARCH_INPUT_NAME,
} from "../../redux/ActionTypes";

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    // case POST_PRODUCT:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
}
