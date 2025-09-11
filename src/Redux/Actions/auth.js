import { SET_TOKEN, CLEAR_TOKEN } from "../../redux/ActionTypes";
import { jwtDecode } from "jwt-decode";

export const setAccessToken = (token) => async (dispatch) => {
  try {
    if (!token) {
      return console.warn("Token not provided");
    }
    const decoded = jwtDecode(token);
    const exp = Number(decoded.exp);
    dispatch({
      type: SET_TOKEN,
      payload: { token, exp },
    });
  } catch (error) {
    console.error({ message: "setAccessToken error: ", error });
  }
};

export const clearToken = () => ({ type: CLEAR_TOKEN });
