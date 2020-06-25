import { combineReducers } from "redux";
import user from "./user";
import business from "./business";

const rootReducer = combineReducers({
  user,
  business,
});

export default rootReducer;
