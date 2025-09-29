import {
  CLEAR_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  FILTER_PRODUCTS,
  SEARCH_PRODUCT_BY_NAME,
} from "../../redux/ActionTypes";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
});

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/products`);

      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
export function postOrUpdateProduct(formInput, value, id) {
  return async function (dispatch) {
    try {
      if (value === undefined && id === undefined) {
        const { data } = await axios.post(`${API_URL}/products`, formInput, {
          withCredentials: true,
        });
        return dispatch({
          type: POST_PRODUCT,
          payload: data,
        });
      } else {
        const { data } = await axios.put(
          `${API_URL}/products/${id}`,
          formInput
        );
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDescription(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      return dispatch({
        type: GET_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function deleteProducts(idsToDelete) {
  return async function (dispatch) {
    try {
      await axios.delete(`${API_URL}/products/bulk-delete-products`, {
        data: { idsToDelete },
      });
      const { data: allProducts } = await axios.get(`${API_URL}/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allProducts,
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
        type: SEARCH_PRODUCT_BY_NAME,
        payload: input,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterProducts(value) {
  return async function (dispatch) {
    try {
      dispatch({
        type: FILTER_PRODUCTS,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
