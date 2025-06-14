import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "../Reducer/index";
import authReducer from "../Reducer/auth";
import productsReducer from "../../redux/Reducer/products";

const rootReducer = combineReducers({
	root: RootReducer,
	auth: authReducer,
	products: productsReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
