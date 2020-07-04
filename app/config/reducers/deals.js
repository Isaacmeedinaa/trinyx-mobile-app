const deals = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_DEALS":
      return action.deals;

    case "ADD_DEAL":
      return [...state, action.deal];

    case "SEARCH_DEALS":
      return state.filter((deal) => deal.business.name === action.searchQuery);

    default:
      return state;
  }
};

export default deals;
