const dealComments = (state = [], action) => {
  switch (action.type) {
    case "FETCH_DEAL_COMMENTS":
      return action.dealComments;

    case "ADD_DEAL_COMMENT":
      return [action.comment, ...state];

    case "DELETE_DEAL_COMMENT":
      return state.filter((comment) => comment.id !== action.comment.id);

    default:
      return state;
  }
};

export default dealComments;
