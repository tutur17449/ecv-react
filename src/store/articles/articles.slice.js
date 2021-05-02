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
    SET_NEW_ARTICLE: (state, { payload }) => {
      state.articlesList = [payload, ...state.articlesList];
    },
  },
});

export const { SET_ARTICLES, SET_NEW_ARTICLE } = articlesSlice.actions;

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

export const fetchCreateArticle = (formData) => async (dispatch) => {
  dispatch(SET_LOADING("articleActions"));
  try {
    const { data } = await httpClient.post("/api/articles", formData);
    dispatch(SET_NEW_ARTICLE(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("articleActions"));
  }
};
