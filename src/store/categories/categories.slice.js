const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  error: null,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    SET_CATEGORIES: (state, { payload }) => {},
  },
});

export const { SET_CATEGORIES } = categoriesSlice.actions;

export default categoriesSlice.reducer;
