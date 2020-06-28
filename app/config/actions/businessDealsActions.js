import { IP_ADDRESS } from "../ip";

export const fetchBusinessDeals = (businessId) => {
  return (disptach) => {
    const allDealsURL = `http://${IP_ADDRESS}:4000/api/v1/deals`;
    fetch(allDealsURL)
      .then((resp) => resp.json())
      .then((deals) => {
        let businessDeals = deals.filter(
          (deal) => deal.business.id === businessId
        );

        disptach({
          type: "FETCH_BUSINESS_DEALS",
          businessDeals: businessDeals,
        });
      });
  };
};

export const addBusinessDeal = (businessDeal) => {
  return {
    type: "ADD_BUSINESS_DEAL",
    businessDeal,
  };
};

export const editBusinessDeal = (businessDeal) => {
  return {
    type: "EDIT_BUSINESS_DEAL",
    businessDeal,
  };
};

export const deleteBusinessDeal = (businessDeal) => {
  return {
    type: "DELETE_BUSINESS_DEAL",
    businessDeal,
  };
};
