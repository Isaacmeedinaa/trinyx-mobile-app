import { IP_ADDRESS } from "../ip";

export const fetchUserLikes = (user) => {
  return (dispatch) => {
    const allLikes = `http:${IP_ADDRESS}:4000/api/v1/likes`;
    fetch(allLikes)
      .then((resp) => resp.json())
      .then((likes) => {
        let userLikes = likes.filter((like) => like.user.id === user.id);
        dispatch({ type: "FETCH_USER_LIKES", userLikes: userLikes });
      });
  };
};

export const addLike = (deal, user, business, addDealLike) => {
  return (dispatch) => {
    const createLikeURL = `http:${IP_ADDRESS}:4000/api/v1/likes`;

    const likeData = {
      like: {
        user_id: user.id,
        business_id: business.id,
        deal_id: deal.id,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(likeData),
    };

    fetch(createLikeURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          dispatch({ type: "ADD_LIKE", like: obj.like });
        } else {
          console.log("cannot like");
        }
      });
  };
};

export const removeLike = (dealLike) => {
  return (dispatch) => {
    const removeLikeURL = `http:${IP_ADDRESS}:4000/api/v1/likes/${dealLike.id}`;

    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({ id: dealLike.id }),
    };

    fetch(removeLikeURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          dispatch({ type: "REMOVE_LIKE", like: dealLike });
        } else {
          console.log("cannot unlike");
        }
      });
  };
};
