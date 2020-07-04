const userLikes = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER_LIKES":
      return action.userLikes;

    case "ADD_LIKE":
      return state.concat(action.like);

    case "REMOVE_LIKE":
      return state.filter((like) => like.id !== action.like.id);

    default:
      return state;
  }
};

export default userLikes;
