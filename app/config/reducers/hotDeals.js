const hotDeals = (state = [], action) => {
  switch (action.type) {
    case "FETCH_HOTTEST_DEALS":
      return action.hotDeals;

    default:
      return state;
  }
};

export default hotDeals;
