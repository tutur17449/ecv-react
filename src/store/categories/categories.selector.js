export const getCategories = (state) => {
  return state.categories.categoriesList;
};

export const getIsInit = (state) => {
  return state.categories.isInit;
};

export const getCategory = (id) => (state) => {
  return state.categories.categoriesList.find(
    (category) => category.id === parseInt(id)
  );
};
