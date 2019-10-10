import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Categories from "../reducers/Categories";
import Books from "../reducers/Books";
import Reviews from "../reducers/Reviews";
import Users from "../reducers/Users";

const store = createStore (
    combineReducers({ Categories, Books, Reviews, Users }), applyMiddleware(thunk)

);

export default store;