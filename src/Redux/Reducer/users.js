import {
  GET_ALL_USERS,
  // GET_CHECK_USERNAME,
  // GET_USER_ID,
  // POST_USER,
  // UPDATE_USER,
  // SET_STATUS_USER,
  SET_USER,
} from "../../redux/ActionTypes";

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    // case GET_USER_ID:
    //   return {
    //     ...state,
    //     dbUser: action.payload,
    //   };
    // case GET_CHECK_USERNAME:
    //   return {
    //     ...state,
    //     usernameAvailable: action.payload,
    //   };
    // case POST_USER:
    //   return {
    //     ...state,
    //     dbUser: action.payload,
    //   };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    // case SET_STATUS_USER:
    //   return {
    //     ...state,
    //   };
    // case UPDATE_USER:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

export default userReducer;
