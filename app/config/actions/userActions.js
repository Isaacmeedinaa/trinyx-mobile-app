export const userLogin = (user) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    user,
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
