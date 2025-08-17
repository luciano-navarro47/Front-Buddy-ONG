import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  SHOP_FILTER_VALUE,
  SHOP_SEARCH_INPUT_NAME,
} from "../../redux/ActionTypes";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const allProducts = await axios.get(`${API_URL}/products`);

      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allProducts.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postOrUpdateProduct(formInput, value, id) {
  return async function (dispatch) {
    try {
      if (value === undefined) {
        await axios.post(`${API_URL}/products`, formInput);
        return dispatch({
          type: POST_PRODUCT,
        });
      } else {
        await axios.put(`${API_URL}/products/${id}`, formInput);
        dispatch({
          type: UPDATE_PRODUCT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDetail(obj) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${API_URL}/products/${obj.id}`);
      productDetail.data[0].handlerSetCart = obj.handlerSetCart;
      productDetail.data[0].handleRemoveItemCart = obj.handleRemoveItemCart;
      return dispatch({
        type: GET_PRODUCT,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDescription(id) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${API_URL}/products/${id}`);
      return dispatch({
        type: GET_PRODUCT,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteProductAdmin(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      const json = await axios.get(`http://localhost:3001/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function shopSearchInputName(input) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SHOP_SEARCH_INPUT_NAME,
        payload: input,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function shopFilterValue(value) {
  return async function (dispatch) {
    try {
      dispatch({
        type: SHOP_FILTER_VALUE,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
