import {
  GET_ALL_USERS,
  GET_USER_ID,
  GET_CHECK_USERNAME,
  POST_USER,
  UPDATE_USER,
} from "../ActionTypes";
import { HOST, header } from "../../utils";
import axios from "axios";

// USERS
export function getAllUsers() {
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
}

export function postUser(formInput) {
  return async function (dispatch) {
    try {
      const newUser = await axios.post(`${HOST}/users`, formInput);
      return dispatch({
        type: POST_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(userID, formInput) {
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
}

export function getUserId(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/users/${id}`);
      return dispatch({ type: GET_USER_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

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
