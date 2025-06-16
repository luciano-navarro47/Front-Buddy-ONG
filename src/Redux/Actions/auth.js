import { SET_TOKEN, CLEAR_TOKEN } from "../../redux/ActionTypes";
import { jwtDecode } from "jwt-decode";

export const setAccessToken = (token) => async (dispatch) => {
  try {
    if (!token) {
      return console.warn("Token not provided");
    }
    const decoded = jwtDecode(token);
    dispatch({
      type: SET_TOKEN,
      payload: { token: token, exp: decoded.exp },
    });
  } catch (error) {
    console.error({ error: error.message });
  }
};

export const clearToken = () => ({ type: CLEAR_TOKEN });
