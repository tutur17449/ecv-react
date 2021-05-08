export const getUsers = (state) => {
  return state.users.usersList;
};

export const getUser = (id) => (state) => {
  return state.users.usersList.find(
    (user) => user.id === parseInt(id)
  );
};