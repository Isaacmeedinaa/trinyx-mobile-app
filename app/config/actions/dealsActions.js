import { IP_ADDRESS } from "../ip";

export const fetchAllDeals = (deals) => {
  return (disptach) => {
    const allDealsURL = `http://${IP_ADDRESS}:4000/api/v1/deals`;
    fetch(allDealsURL)
      .then((resp) => resp.json())
      .then((deals) => {
        disptach({ type: "FETCH_ALL_DEALS", deals: deals });
      });
  };
};