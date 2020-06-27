const deals = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_DEALS":
      return action.deals;

    default:
      return state;
  }
};

export default deals;
