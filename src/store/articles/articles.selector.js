export const getArticles = (state) => {
  return state.articles.articlesList;
};

export const getArticlesWithSearch = (searchValue) => (state) => {
  return state.articles.articlesList.filter(
    (i) =>
      i.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
      i.description.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const getArticle = (id) => (state) => {
  return state.articles.articlesList.find(
    (article) => article.id === parseInt(id)
  );
};

export const getLastArticles = (state) => {
  const tmp = [...state.articles.articlesList];
  tmp.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return tmp.slice(0, 3);
};

export const getIsInit = (state) => {
  return state.articles.isInit;
};
