const deals = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_DEALS":
      return action.deals;

    case "ADD_DEAL":
      return [...state, action.deal];

    default:
      return state;
  }
};

export default deals;
