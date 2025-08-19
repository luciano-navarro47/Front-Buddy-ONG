import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  // POST_PRODUCT,
  // UPDATE_PRODUCT,
  // DELETE_PRODUCT,
  // SHOP_FILTER_VALUE,
  // SHOP_SEARCH_INPUT_NAME,
} from "../../redux/ActionTypes";

const initialState = {
  allProducts: [],
  product: {},
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
      };
    // case POST_PRODUCT:
    //   return {
    //     ...state,
    //   };
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
