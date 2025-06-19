import {
  GET_PETS,
  GET_PET_ID,
  POST_PET,
  FILTER_ADOPTION_VALUES,
  FILTER_BY_SEARCH_AREA,
  UPDATE_PET,
  DELETE_PET,
} from "../ActionTypes";
import { HOST, header } from "../../utils";
import axios from "axios";

export function getPets(value) {
  return async function (dispatch) {
    try {
      if (value === undefined) {
        const json = await axios.get(`${HOST}/pet`);
        const payload = {
          allPets: json.data,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
      if (value === "lostPets") {
        const json = await axios.get(`${HOST}/pet`);
        const lostPets = json.data.filter((pet) => pet.status === "perdido");
        const payload = {
          lostPets,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
      if (value === "adoptions") {
        const json = await axios.get(`${HOST}/pet`);
        const adoptionPets = json.data.filter(
          (pet) => pet.status === "encontrado"
        );
        const payload = {
          adoptionPets,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const getPetDetails = (id) => async (dispatch) => {
  try {
    const getID = await axios.get(`${HOST}/pet/${id}`);
    return dispatch({
      type: GET_PET_ID,
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

export function postOrUpdatePet(formInput, value, petId) {
  return async function (dispatch) {
    try {
      if (value === "update") {
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

export function deletePet(idPet, idUser) {
  return async function (dispatch) {
    try {
      await axios.delete(`${HOST}/pets/${idPet}`);
      const json = await axios.get(`http://localhost:3001/user/${idUser}`);
      return dispatch({
        type: DELETE_PET,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePetAdmin(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${HOST}/pets/${id}`);
      const json = await axios.get(`http://localhost:3001/pet`);
      return dispatch({
        type: GET_PETS,
        payload: { allPets: json.data },
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
