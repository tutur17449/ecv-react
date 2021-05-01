import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../lib/axios";
import { SET_LOADING, SET_COMPLETE } from "../api/api.slice";

const initialState = {
  isInit: false,
  articlesList: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    SET_ARTICLES: (state, { payload }) => {
      state.articlesList = payload;
      state.isInit = true;
    },
  },
});

export const { SET_ARTICLES } = articlesSlice.actions;

export default articlesSlice.reducer;

// Thunks
export const fetchInitialArticles = () => async (dispatch) => {
  dispatch(SET_LOADING("getInitialArticles"));
  try {
    const { data } = await httpClient.get("/api/articles");
    dispatch(SET_ARTICLES(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("getInitialArticles"));
  }
};
