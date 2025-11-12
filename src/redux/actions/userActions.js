import {
  GET_ALL_USERS,
  GET_USER_ID,
  GET_CHECK_USERNAME,
  POST_USER,
  UPDATE_USER,
  SET_USER,
} from "../actionTypes";
import axios from "axios";
import { setAccessToken } from "./auth";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${API_URL}/user`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: json.data,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const fetchAuth0User = (auth0Sub) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/user/oauth-user?id=${encodeURIComponent(auth0Sub)}`
      );
      const existingUser = response.data.user;


      if (existingUser) {
        dispatch({
          type: SET_USER,
          payload: existingUser,
        });
        dispatch(setUserState(existingUser));
        try {
          localStorage.setItem("loggedUser", JSON.stringify(existingUser));
        } catch (error) {
          console.warn("Could not persist loggedUser to localStorage ", error);
        }
      }
      return existingUser;
    } catch (error) {
      throw error;
    }
  };
};

export const postUser = (user) => {
  return async function (dispatch) {
    try {
      let response;
      if (user.auth0Sub) {
        response = await axios.post(`${API_URL}/user/oauth-upsert`, user);
      } else {
        response = await axios.post(`${API_URL}/user/register`, user);
      }

      const data = response.data;

      if (data?.token) {
        dispatch(setAccessToken(data.token));
        localStorage.setItem("token", data.token);
      }

      const userObj = data?.user;
      if (userObj) {
        dispatch(setUserState(userObj));
        localStorage.setItem("loggedUser", JSON.stringify(userObj));
      }

      dispatch({ type: POST_USER });

      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
};

export const updateUser = (userId, formInput) => {
  return async function (dispatch) {
    try {
      await axios.put(`${API_URL}/user/${userId}`, formInput);

      dispatch({
        type: UPDATE_USER,
      });
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };
};

export const getUserById = (id) => {
  return async function (dispatch) {
    if (!id) return;
    try {
      const userInfo = await axios.get(`${API_URL}/user/${id}`);
      dispatch({ type: GET_USER_ID, payload: userInfo.data[0] });
    } catch (error) {
      // console.log(error);
    }
  };
};

export function bulkSetStatusUser(changesArray) {
  return async function (dispatch) {
    try {
      await axios.put(`${API_URL}/user/bulk-set-status`, changesArray);
      const updatedUsers = await axios.get(`${API_URL}/user`);
      dispatch({
        type: GET_ALL_USERS,
        payload: updatedUsers.data,
      });
    } catch (error) {
      // console.log(error);
    }
  };
}

export function checkUsernameAvailability(username) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${API_URL}/user/check-username?username=${username}`,
        {
          headers: { "Cache-control": "no-cache" },
        }
      );

      dispatch({
        type: GET_CHECK_USERNAME,
        payload: response.data.available,
      });
      return response.data.available;
    } catch (error) {
      return null;
    }
  };
}

export function checkUserPassword(userId, currentPassword) {
  return async function () {
    const response = await axios.post(`${API_URL}/user/check-password`, {
      userId,
      currentPassword,
    });

    return response.data.ok;
  };
}

export const setUserState = (userData) => {
  return function (dispatch) {
    try {
      dispatch({
        type: SET_USER,
        payload: userData,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const loginUser = async (
  userData,
  dispatch,
  setUser,
  setInputErrors,
  navigate
) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      withCredentials: true,
    });
    handleSuccessfulLogin(response.data, dispatch, setUser, navigate);
  } catch (error) {
    handleLoginError(error, setInputErrors);
  }
};

const handleSuccessfulLogin = (data, dispatch, setUser, navigate) => {
  dispatch(setAccessToken(data.token));
  localStorage.setItem("token", data.token);

  dispatch(setUserState(data.user));
  localStorage.setItem("loggedUser", JSON.stringify(data.user));
  setUser(data.user);

  navigate("/"); 
};

const handleLoginError = (error, setInputErrors) => {
  const errorMessages = {
    "Wrong Email": { email: "Correo electrónico incorrecto" },
    "Wrong password": { password: "Contraseña incorrecta" },
  };

  const errorMessage = error.response?.data?.error;
  if (errorMessage && errorMessages[errorMessage]) {
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      ...errorMessages[errorMessage],
    }));
  }
};
