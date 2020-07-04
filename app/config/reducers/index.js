import { combineReducers } from "redux";
import user from "./user";
import userLikes from "./userLikes";
import business from "./business";
import deals from "./deals";
import dealComments from "./dealComments";
import hotDeals from "./hotDeals";
import businessDeals from "./businessDeals";

const rootReducer = combineReducers({
  user,
  userLikes,
  business,
  deals,
  dealComments,
  hotDeals,
  businessDeals,
});

export default rootReducer;
