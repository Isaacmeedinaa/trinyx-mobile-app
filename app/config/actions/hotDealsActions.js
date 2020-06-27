import { IP_ADDRESS } from "../ip";

export const fetchHottestDeals = (hotDeals) => {
  return (disptach) => {
    const hottestDealsURL = `http://${IP_ADDRESS}:4000/api/v1/hottest_deals`;
    fetch(hottestDealsURL)
      .then((resp) => resp.json())
      .then((hotDeals) => {
        disptach({ type: "FETCH_HOTTEST_DEALS", hotDeals: hotDeals });
      });
  };
};
