import { SET_USER } from "../ActionTypes";

const initialState = {};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
