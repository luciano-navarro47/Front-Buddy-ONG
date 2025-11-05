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

const initialState = {
  allPets: [],
  userPets: [],
  petDetails: {},
};

const petReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        allPets: action.payload
      };
    case GET_PETS_BY_USER:
        return {
            ...state,
            userPets: action.payload
        }
    case FILTER_ADOPTION_VALUES:
      if (action.payload.value === "lostPets") {
        return {
          ...state,
          lostPets: action.payload.lostPets,
          pets: action.payload.lostPets,
        };
      }
      if (action.payload.value === "adoptions") {
        return {
          ...state,
          adoptionPets: action.payload.adoptionPets,
          pets: action.payload.adoptionPets,
        };
      }
      break;
    case GET_PET_BY_ID:
      return {
        ...state,
        petDetails: action.payload,
      };
    case POST_PET:
      return {
        ...state,
      };
    case UPDATE_PET:
      return {
        ...state,
      };
    case DELETE_PET:
      return {
        ...state,
        allPets: action.payload.allPets,
        userPets: action.payload.userPets
      };
    case FILTER_ADOPTION_VALUES:
      let all;
      if (action.payload.value === "adoptions") {
        all = state.adoptionPets;
      } else {
        all = state.lostPets;
      }
      action.payload.arrayFilterValues.forEach((filterValue) => {
        if (filterValue === "macho" || filterValue === "hembra") {
          all = all.filter((pet) => pet.sex === filterValue);
        }
        if (filterValue === "perro" || filterValue === "gato") {
          all = all.filter((pet) => pet.species === filterValue);
        }
        if (
          filterValue === "cachorro" ||
          filterValue === "joven" ||
          filterValue === "adulto"
        ) {
          all = all.filter((pet) => pet.age === filterValue);
        }
        if (
          filterValue === "pequeño" ||
          filterValue === "mediano" ||
          filterValue === "grande"
        ) {
          all = all.filter((pet) => pet.size === filterValue);
        }
      });
      return {
        ...state,
        pets: all,
      };
    case FILTER_BY_SEARCH_AREA:
      if (action.payload.value === "adoptions") {
        return {
          ...state,
          pets: state.adoptionPets.filter((pet) =>
            pet.area
              .toLowerCase()
              .includes(action.payload.inputValue.toLowerCase())
          ),
          actualPage: 1,
        };
      } else {
        return {
          ...state,
          pets: state.lostPets.filter((pet) =>
            pet.area
              .toLowerCase()
              .includes(action.payload.inputValue.toLowerCase())
          ),
        };
      }
    default:
      return state;
  }
};

export default petReducer;
