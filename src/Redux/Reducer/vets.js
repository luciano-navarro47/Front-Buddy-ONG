import {
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
  POST_VET,
} from "../ActionTypes";

const initialState = {
  allVets: [],
  vetsDetail: {},
};

const vetsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case POST_VET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default vetsReducer;
