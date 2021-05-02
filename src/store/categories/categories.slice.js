import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../lib/axios";
import { SET_LOADING, SET_COMPLETE } from "../api/api.slice";

const initialState = {
  isInit: false,
  categoriesList: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    SET_CATEGORIES: (state, { payload }) => {
      state.categoriesList = payload;
      state.isInit = true;
    },
  },
});

export const { SET_CATEGORIES } = categoriesSlice.actions;

export default categoriesSlice.reducer;

// Thunks
export const fetchInitialCategories = () => async (dispatch) => {
  dispatch(SET_LOADING("getInitialCategories"));
  try {
    const { data } = await httpClient.get("/api/categories");
    dispatch(SET_CATEGORIES(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("getInitialCategories"));
  }
};
