import {
  POST_VET,
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
} from "../../redux/ActionTypes";

const initialState = {
  allVets: [],
  vetsDetail: {},
  cart: [],
  functions: {},
  actualPage: 1,
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {


    // PRODUCT REDUCER // PRODUCT REDUCER // PRODUCT REDUCER
    // case POST_PRODUCT:
    //   return {
    //     ...state,
    //   };
    // case UPDATE_PRODUCT:
    //   return {
    //     ...state,
    //   };
    // case GET_ALL_PRODUCTS:
    //   return {
    //     ...state,
    //     allProducts: action.payload,
    //     products: action.payload,
    //   };
    // case GET_PRODUCT_DETAIL:
    //   return {
    //     ...state,
    //     productDetail: action.payload,
    //   };
    // case SHOP_SEARCH_INPUT_NAME:
    //   return {
    //     ...state,
    //     products: state.allProducts.filter((product) =>
    //       product.name.toLowerCase().includes(action.payload.toLowerCase())
    //     ),
    //   };
    // case SHOP_FILTER_VALUE:
    //   return {
    //     ...state,
    //     products: state.allProducts.filter(
    //       (p) => p.Category === action.payload
    //     ),
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     allProducts: action.payload,
    //   };

    // VETERINARIES // VETERINARIES // VETERINARIES
    case GET_VETERINARIES:
      return {
        ...state,
        allVets: action.payload,
      };
    case GET_DETAILS_VETERINARIES:
      return {
        ...state,
        vetsDetail: action.payload,
      };
    case POST_VET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default RootReducer;
