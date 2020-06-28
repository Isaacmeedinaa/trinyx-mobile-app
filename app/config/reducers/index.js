import { combineReducers } from "redux";
import user from "./user";
import business from "./business";
import deals from "./deals";
import hotDeals from "./hotDeals";
import businessDeals from "./businessDeals";

const rootReducer = combineReducers({
  user,
  business,
  deals,
  hotDeals,
  businessDeals,
});

export default rootReducer;
