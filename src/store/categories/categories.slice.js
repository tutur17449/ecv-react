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
    SET_NEW_CATEGORY: (state, { payload }) => {
      state.categoriesList = [...state.categoriesList, payload];
    },
    SET_UPDATE_CATEGORY: (state, { payload }) => {
      const index = state.categoriesList.findIndex((i) => i.id === payload.id);
      if (index !== -1) {
        state.categoriesList[index] = payload;
      }
    },
    SET_DELETE_CATEGORY: (state, { payload }) => {
      state.categoriesList = [
        ...state.categoriesList.filter((i) => i.id !== payload.id),
      ];
    },
  },
});

export const {
  SET_CATEGORIES,
  SET_NEW_CATEGORY,
  SET_UPDATE_CATEGORY,
  SET_DELETE_CATEGORY,
} = categoriesSlice.actions;

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

export const fetchCreateCategory = (formData) => async (dispatch) => {
  dispatch(SET_LOADING("categoryActions"));
  try {
    const { data } = await httpClient.post("/api/categories", formData);
    dispatch(SET_NEW_CATEGORY(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("categoryActions"));
  }
};

export const fetchUpdateCategory = (formData) => async (dispatch) => {
  dispatch(SET_LOADING("categoryActions"));
  try {
    const { data } = await httpClient.put(
      `/api/categories/${formData.id}`,
      formData
    );
    dispatch(SET_UPDATE_CATEGORY(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("categoryActions"));
  }
};

export const fetchDeleteCategory = (id) => async (dispatch) => {
  dispatch(SET_LOADING("categoryActions"));
  try {
    await httpClient.delete(`/api/categories/${id}`);
    dispatch(SET_DELETE_CATEGORY({ id }));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("categoryActions"));
  }
};
