import {
  GET_ALL_USERS,
//   GET_CHECK_USERNAME,
//   GET_USER_ID,
//   POST_USER,
//   UPDATE_USER,
//   SET_STATUS_USER,
//   SET_USER,
} from "../../redux/ActionTypes";

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
