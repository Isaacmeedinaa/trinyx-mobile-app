import { IP_ADDRESS } from "../ip";

export const fetchDealComments = (dealId) => {
  return (dispatch) => {
    const allCommentsURL = `http://${IP_ADDRESS}:4000/api/v1/comments`;
    fetch(allCommentsURL)
      .then((resp) => resp.json())
      .then((comments) => {
        let dealComments = comments.filter(
          (comment) => comment.deal.id === dealId
        );

        dispatch({ type: "FETCH_DEAL_COMMENTS", dealComments: dealComments });
      });
  };
};

export const addDealComment = (comment) => {
  return {
    type: "ADD_DEAL_COMMENT",
    comment,
  };
};

export const deleteDealComment = (comment) => {
  return {
    type: "DELETE_DEAL_COMMENT",
    comment,
  };
};
