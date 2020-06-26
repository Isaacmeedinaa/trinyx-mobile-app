export const businessLogin = (business) => {
  return {
    type: "BUSINESS_LOGIN_SUCCESS",
    business,
  };
};

export const businessRegister = (business) => {
  return {
    type: "BUSINESS_REGISTER_SUCCESS",
    business,
  };
};

export const setBusiness = (business) => {
  return {
    type: "SET_BUSINESS",
    business,
  };
};

export const logoutBusiness = () => {
  return {
    type: "LOGOUT_BUSINESS",
  };
};
