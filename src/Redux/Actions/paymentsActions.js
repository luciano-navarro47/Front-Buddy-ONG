import axios from "axios";
import { CREATE_CHECKOUT, CREATE_CHECKOUT_ERROR } from "../ActionTypes";

const API_URL = process.env.REACT_APP_API_URL;

export function createCheckout(cart) {
  console.log("CART: ", cart)
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${API_URL}/preference`, { cart });
      console.log("DATA: ", data);
      dispatch({
        type: CREATE_CHECKOUT,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: CREATE_CHECKOUT_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };
}
