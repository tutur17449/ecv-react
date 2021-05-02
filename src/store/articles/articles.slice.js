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
    SET_UPDATE_ARTICLE: (state, { payload }) => {
      const index = state.articlesList.findIndex((i) => i.id === payload.id);
      if (index !== -1) {
        state.articlesList[index] = payload;
      }
    },
  },
});

export const {
  SET_ARTICLES,
  SET_NEW_ARTICLE,
  SET_UPDATE_ARTICLE,
} = articlesSlice.actions;

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

export const fetchUpdateArticle = (formData) => async (dispatch) => {
  dispatch(SET_LOADING("articleActions"));
  try {
    const { data } = await httpClient.put(
      `/api/articles/${formData.id}`,
      formData
    );
    dispatch(SET_UPDATE_ARTICLE(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("articleActions"));
  }
};
