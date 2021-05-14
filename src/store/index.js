import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import articles from "./articles/articles.slice";
import categories from "./categories/categories.slice";
import api from "./api/api.slice";

const reducer = combineReducers({
  articles,
  categories,
  api,
});

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
