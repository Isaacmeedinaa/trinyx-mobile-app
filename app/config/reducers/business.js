const business = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_LOGIN_SUCCESS":
      return action.business;

    case "BUSINESS_REGISTER_SUCCESS":
      return action.business;

    case "SET_BUSINESS":
      return action.business;

    case "LOGOUT_BUSINESS":
      return {};

    default:
      return state;
  }
};

export default business;
