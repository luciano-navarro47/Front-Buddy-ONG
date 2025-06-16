import { GET_ALL_USERS } from "../../redux/ActionTypes";

const initialState = [];

export default function usersListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
}
