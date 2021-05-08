import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../lib/axios";
import { SET_LOADING, SET_COMPLETE } from "../api/api.slice";

const initialState = {
  usersList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SET_UPDATE_USER: (state, { payload }) => {
      const index = state.usersList.findIndex((i) => i.id === payload.id);
      if (index !== -1) {
        state.usersList[index] = payload;
      }
    },
  },
});

export const {
  SET_UPDATE_USER,
} = usersSlice.actions;

export default usersSlice.reducer;

// Thunks
export const fetchUpdateUser = (formData) => async (dispatch) => {
  dispatch(SET_LOADING("userActions"));
  try {
    const { data } = await httpClient.put(
      `/api/profile/${formData.id}`,
      formData
    );
    dispatch(SET_UPDATE_USER(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(SET_COMPLETE("userActions"));
  }
};