import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "../reducer/auth";
import productReducer from "../reducer/products";
import currentUserReducer from "../reducer/currentUser";
import usersListReducer from "../reducer/usersList";
import petReducer  from "../reducer/pets";
import vetsReducer from "../reducer/vets";
import paymentReducer from "redux/reducer/payments";

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
