import {
  GET_PETS,
  // GET_ADOPTION_PETS,
  GET_PET_ID,
  // GET_LOST_PETS,
  UPDATE_PET,
  DELETE_PET,
  POST_PET,
  POST_VET,
  FILTER_ADOPTION_VALUES,
  FILTER_BY_SEARCH_AREA,
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
} from "../../redux/ActionTypes";

const initialState = {
  pets: [],
  petDetails: {},
  actualPage: 1,
  allVets: [],
  vetsDetail: {},
  cart: [],
  functions: {},
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PETS:
      return action.payload;
    // if (action.payload.value === "lostPets") {
    //   return {
    //     ...state,
    //     lostPets: action.payload.lostPets,
    //     pets: action.payload.lostPets,
    //   };
    // }
    // if (action.payload.value === "adoptions") {
    //   return {
    //     ...state,
    //     adoptionPets: action.payload.adoptionPets,
    //     pets: action.payload.adoptionPets,
    //   };
    // }
    // break;
    case GET_PET_ID:
      return {
        ...state,
        petDetails: action.payload[0],
      };
    // case POST_PRODUCT:
    //   return {
    //     ...state,
    //   };
    // case UPDATE_PRODUCT:
    //   return {
    //     ...state,
    //   };
    case POST_PET:
      return {
        ...state,
      };
    case UPDATE_PET:
      return {
        ...state,
      };
    case POST_VET:
      return {
        ...state,
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
    // case GET_ALL_PRODUCTS:
    //   return {
    //     ...state,
    //     allProducts: action.payload,
    //     products: action.payload,
    //   };
    // case GET_PRODUCT_DETAIL:
    //   return {
    //     ...state,
    //     productDetail: action.payload,
    //   };
    // case SHOP_SEARCH_INPUT_NAME:
    //   return {
    //     ...state,
    //     products: state.allProducts.filter((product) =>
    //       product.name.toLowerCase().includes(action.payload.toLowerCase())
    //     ),
    //   };
    // case SHOP_FILTER_VALUE:
    //   return {
    //     ...state,
    //     products: state.allProducts.filter(
    //       (p) => p.Category === action.payload
    //     ),
    //   };
    case GET_VETERINARIES:
      return {
        ...state,
        allVets: action.payload,
      };
    case GET_DETAILS_VETERINARIES:
      return {
        ...state,
        vetsDetail: action.payload,
      };

    case DELETE_PET:
      return {
        ...state,
        user: action.payload,
      };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     allProducts: action.payload,
    //   };
    default:
      return state;
  }
};

export default RootReducer;
