import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "../Reducer/index";
import authReducer from "../Reducer/auth";
import productReducer from "../../redux/Reducer/products";
import currentUserReducer from "../Reducer/currentUser";
import usersListReducer from "../Reducer/usersList";
import petReducer  from "../Reducer/pets";

const rootReducer = combineReducers({
	root: RootReducer,
	auth: authReducer,
	products: productReducer,
	user: currentUserReducer,
	users: usersListReducer,
	pets: petReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
