const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  error: null,
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    SET_ARTICLES: (state, { payload }) => {},
  },
});

export const { SET_ARTICLES } = articlesSlice.actions;

export default articlesSlice.reducer;
