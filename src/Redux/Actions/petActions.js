import {
  GET_PET_BY_ID,
  GET_PETS,
  GET_PETS_BY_USER,
  POST_PET,
  UPDATE_PET,
  DELETE_PET,
  FILTER_ADOPTION_VALUES,
  FILTER_BY_SEARCH_AREA,
} from "../actionTypes";
import axios from "axios";
import { HOST, header } from "../../utils";

export function getPets() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${HOST}/pet`);
      return dispatch({
        type: GET_PETS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPetsByUser(id) {
  return async function (dispatch) {
    try {
      if (!id) throw new Error("Id not provided.");
      const res = await axios.get(`${HOST}/pet/user/${id}`);
      const userPets = res.data;
      return dispatch({
        type: GET_PETS_BY_USER,
        payload: userPets,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getPetDetails = (id) => async (dispatch) => {
  try {
    const getID = await axios.get(`${HOST}/pet/${id}`);
    return dispatch({
      type: GET_PET_BY_ID,
      payload: getID.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export function postPet(formInput, token) {
  return async function (dispatch) {
    try {
      const config = header(token);
      await axios.post(`${HOST}/pet`, formInput, config);
      return dispatch({
        type: POST_PET,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrUpdatePet(formInput, isUpdating, petId) {
  console.log("FORMINPUT: ", formInput)
  return async function (dispatch) {
    try {
      if (isUpdating) {
        await axios.put(`${HOST}/pet/${petId}`, formInput);
        return dispatch({
          type: UPDATE_PET,
        });
      } else {
        const userId = JSON.parse(localStorage.getItem("loggedUser")).id;
        formInput = { ...formInput, userId };
        await axios.post(`${HOST}/pet`, formInput);
        return dispatch({
          type: POST_PET,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deletePet(petId, userId) {
  return async function (dispatch) {
    try {
      await axios.delete(`${HOST}/pet/${petId}`);
      const allPets = await axios.get(`http://localhost:3001/pet`);
      const usersPets = await axios.get(
        `http://localhost:3001/pet/user/${userId}`
      );
      return dispatch({
        type: DELETE_PET,
        payload: { allPets: allPets.data, userPets: usersPets.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePetAdmin(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${HOST}/pet/${id}`);
      return dispatch({
        type: DELETE_PET,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterAdoptionPets(arrayFilterValues, value) {
  return async function (dispatch) {
    try {
      const payload = {
        arrayFilterValues,
        value,
      };
      dispatch({
        type: FILTER_ADOPTION_VALUES,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterBySearchArea(inputValue, value) {
  return async function (dispatch) {
    try {
      let payload = {
        inputValue,
        value,
      };
      return dispatch({
        type: FILTER_BY_SEARCH_AREA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
