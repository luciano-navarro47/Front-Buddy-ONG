import { SET_TOKEN } from "../ActionTypes";
import { jwtDecode } from "jwt-decode";

export const setAccessToken = (token) => {
  return async (dispatch) => {
    try {
      if (!token) {
        console.warn("Token not provided");
        return;
      }
      const decoded = jwtDecode(token);
      // console.log("DECO: ", decoded);
      const payload = {
        token: token,
        exp: decoded.exp,
      };
      return dispatch({
        type: SET_TOKEN,
        payload: payload,
      });
    } catch (error) {
      console.error({ error: error.message });
    }
  };
};
