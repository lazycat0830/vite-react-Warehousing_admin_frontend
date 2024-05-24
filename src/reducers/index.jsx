import { combineReducers } from "redux";

import global from "./global";
import orderMean from "./orderMean";
import product from "./product";
import productType from "./productType";

export default combineReducers({
  global,
  orderMean,
  product,
  productType
});
