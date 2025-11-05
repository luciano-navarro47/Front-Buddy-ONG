import { GET_USER_ID, SET_USER } from "../actionTypes";

const initialState = {};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID:
      return action.payload;
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
