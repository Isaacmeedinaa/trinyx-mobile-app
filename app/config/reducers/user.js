const user = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return action.user;

    case "SET_USER":
      return action.user;

    case "LOGOUT_USER":
      return {};

    default:
      return state;
  }
};

export default user;
