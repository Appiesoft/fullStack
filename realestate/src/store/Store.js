import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
// Define your reducers (replace these with your actual reducers)
import { productDetailsReducer, productReducer } from "../thunk/reducers/productReducer";
import { userReducer } from "../thunk/reducers/userReducer";


// Combine your reducers
const reducer = combineReducers({
  products: productReducer,
  productDetails:productDetailsReducer,
  user:userReducer,

});


const initialState = {};

// Apply middleware (thunk in this example)
const middleware = [thunk];

// Create the Redux store
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
