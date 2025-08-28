import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  CLEAR_PRODUCT,
  POST_PRODUCT,
  // DELETE_PRODUCT,
  // SHOP_FILTER_VALUE,
  // SHOP_SEARCH_INPUT_NAME,
} from "../../redux/ActionTypes";

const initialState = {
  allProducts: [],
  product: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: Array.isArray(action.payload) ? action.payload : [],
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload || null,
      };
    case POST_PRODUCT:
      return {
        ...state,
      };
    case UPDATE_PRODUCT:
      const payload = action.payload;
      if (!payload || !payload.id) return state;

      const updateId = String(payload.id);

      return {
        ...state,
        allProducts: (state.allProducts || []).map((p) =>
          String(p.id) === updateId ? { ...p, ...payload } : p
        ),
        product:
          state.product && String(state.product.id) === updateId
            ? { ...state.product, ...payload }
            : state.product,
      };
    default:
      return state;
  }
}
