import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "../Reducer/index";
import authReducer from "../Reducer/auth";
import productReducer from "../../redux/Reducer/products";
import userReducer from "../../redux/Reducer/users";

const rootReducer = combineReducers({
	root: RootReducer,
	auth: authReducer,
	products: productReducer,
	user: userReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
