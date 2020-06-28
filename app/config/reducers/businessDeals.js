const businessDeals = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BUSINESS_DEALS":
      return action.businessDeals;

    case "ADD_BUSINESS_DEAL":
      return [action.businessDeal, ...state];

    case "EDIT_BUSINESS_DEAL":
      return state
        .filter((deal) => deal.id !== action.businessDeal.id)
        .concat(action.businessDeal);

    case "DELETE_BUSINESS_DEAL":
      return state.filter((deal) => deal.id !== action.businessDeal.id);

    default:
      return state;
  }
};

export default businessDeals;
