import {
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
  POST_VET,
  UPDATE_VET,
} from "../ActionTypes";
import { 
  HOST,
  // header
} from "../../utils";
import axios from "axios";

export function getAllVeterinaries() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/veterinary");
      return dispatch({
        type: GET_VETERINARIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrUpdateVet(formInput, value, id) {
  return async function (dispatch) {
    try {
      if (value === undefined) {
        await axios.post(`${HOST}/veterinary`, formInput);
        return dispatch({
          type: POST_VET,
        });
      } else {
        await axios.put(`${HOST}/veterinary/${id}`, formInput);
        dispatch({
          type: UPDATE_VET,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const VeterinaryDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${HOST}/veterinary/${id}`);
    return dispatch({
      type: GET_DETAILS_VETERINARIES,
      payload: response.data[0],
    });
  } catch (err) {
    console.log(err.message);
  }
};
