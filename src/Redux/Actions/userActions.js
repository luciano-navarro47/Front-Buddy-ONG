import {
  GET_ALL_USERS,
  GET_USER_ID,
  GET_CHECK_USERNAME,
  POST_USER,
  UPDATE_USER,
  SET_USER,
} from "../ActionTypes";
import { HOST } from "../../utils";
import axios from "axios";

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/users");
      return dispatch({
        type: GET_ALL_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAuth0User = (auth0Sub) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${HOST}/user/oauth-user?id=${auth0Sub}`
      );
      const existingUser = response.data.user;
      dispatch({
        type: SET_USER,
        payload: existingUser,
      });
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
      // Verified by OAuth
      if (user.email_verified) {
        response = await axios.post(`${HOST}/user/oauth-upsert`, user);
      } else {
        response = await axios.post(`${HOST}/user/register`, user);
      }
      const savedUser = response.data;
      dispatch({
        type: POST_USER,
      });
      return savedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateUser = (userID, formInput) => {
  return async function (dispatch) {
    try {
      await axios.put(`${HOST}/users/${userID}`, formInput);

      dispatch({
        type: UPDATE_USER,
      });
    } catch (error) {
      console.log("Action updateUSER", userID, formInput);
    }
  };
};

export const getUserId = (id) => {
  return async function (dispatch) {
    if (!id) {
      console.warn("getUserId was called without an valid Id");
      return;
    }
    try {
      const json = await axios.get(`http://localhost:3001/users/${id}`);
      return dispatch({ type: GET_USER_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserState = (userData) => {
  return function (dispatch) {
    try {
      dispatch({
        type: SET_USER,
        payload: userData,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function setStatusUser(id) {
  return async function (dispatch) {
    try {
      await axios.put(`${HOST}/users/setStatusUser/${id}`);
      const updatedUsers = await axios.get(`${HOST}/users`);
      dispatch({
        type: GET_ALL_USERS,
        payload: updatedUsers.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function checkUsernameAvailability(username) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${HOST}/users/check-username?username=${username}`,
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

export const loginUser = async (
  userData,
  dispatch,
  setUser,
  setInputErrors,
  navigate
) => {
  try {
    const response = await axios.post(`${HOST}/login`, userData, {
      withCredentials: true,
    });
    handleSuccessfulLogin(response.data, dispatch, setUser, navigate);
  } catch (error) {
    handleLoginError(error, setInputErrors);
  }
};

const handleSuccessfulLogin = (data, dispatch, setUser, navigate) => {
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
