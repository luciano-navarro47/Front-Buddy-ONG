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

export const postUser = (formInput) => {
  return async function (dispatch) {
    try {
      await axios.post(`${HOST}/users`, formInput);
      return dispatch({
        type: POST_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (userID, formInput) => {
  return async function (dispatch) {
    try {
      console.log("Action updateUSER", userID);
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
    const response = await axios.post("http://localhost:3001/login", userData, {
      withCredentials: true,
    });

    if (response.data.token) {
      handleSuccessfulLogin(response.data, dispatch, setUser, navigate);
    }
  } catch (error) {
    handleLoginError(error, setInputErrors);
  }
};

const handleSuccessfulLogin = (data, dispatch, setUser, navigate) => {
  dispatch(setUserState(data.user));
  setUser(data.user);
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("loggedUser", JSON.stringify(data.user));
  navigate("/home");
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
