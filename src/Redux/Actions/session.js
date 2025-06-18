import { clearToken } from "./auth";
import { SET_USER } from "../ActionTypes";

export const logout = (auth0Logout = null) => {
  return (dispatch) => {
    if (auth0Logout) {
      auth0Logout({ returnTo: window.location.origin + "/" });
    }

    dispatch(clearToken());
    dispatch({ type: SET_USER, payload: null });

    localStorage.removeItem("loggedUser");
    localStorage.removeItem("alreadyUpserted");
    localStorage.removeItem("token");
  };
};
