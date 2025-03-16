import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  POST_PRODUCT,
  UPDATE_PRODUCT,
} from "../ActionTypes";
import { HOST, header } from "../../utils";
import axios from "axios";

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const allProducts = await axios.get(`${HOST}/products`);
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
        const newProduct = await axios.post(`${HOST}/products`, formInput);
        return dispatch({
          type: POST_PRODUCT,
        });
      } else {
        console.log("FORM INPUT: ", formInput);
        await axios.put(`${HOST}/products/${id}`, formInput);
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
      const productDetail = await axios.get(`${HOST}/products/${obj.id}`);
      productDetail.data[0].handlerSetCart = obj.handlerSetCart;
      productDetail.data[0].handleRemoveItemCart = obj.handleRemoveItemCart;
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDetailAdmin(id) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${HOST}/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
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
      const json = await axios.delete(`${HOST}/products/${id}`);
      const json2 = await axios.get(`http://localhost:3001/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: json2.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
