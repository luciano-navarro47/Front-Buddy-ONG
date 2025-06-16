import { SET_TOKEN, CLEAR_TOKEN } from "../../redux/ActionTypes";

const initialState = {
  token: null,
  tokenType: null,
  expiresAt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.exp,
        tokenType: "Bearer",
      };
    case CLEAR_TOKEN:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
