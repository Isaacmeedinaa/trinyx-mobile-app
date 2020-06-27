import { combineReducers } from "redux";
import user from "./user";
import business from "./business";
import deals from "./deals";
import hotDeals from "./hotDeals";

const rootReducer = combineReducers({
  user,
  business,
  deals,
  hotDeals,
});

export default rootReducer;
