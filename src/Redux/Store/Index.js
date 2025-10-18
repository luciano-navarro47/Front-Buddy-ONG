import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "../Reducer/auth";
import productReducer from "../../redux/Reducer/products";
import currentUserReducer from "../Reducer/currentUser";
import usersListReducer from "../Reducer/usersList";
import petReducer  from "../Reducer/pets";
import vetsReducer from "../Reducer/vets";
import paymentReducer from "redux/Reducer/payments";

const rootReducer = combineReducers({
	auth: authReducer,
	pets: petReducer,
	products: productReducer,
	user: currentUserReducer,
	users: usersListReducer,
	vets: vetsReducer,
	payment: paymentReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
