import { combineReducers } from "redux";

import global from "./global";
import orderMean from "./orderMean";
import product from "./product";
import productType from "./productType";
import company from "./company";
import Inventory from "./Inventory";
import dropDown from "./dropDown";

export default combineReducers({
  global,
  orderMean,
  product,
  productType,
  company,
  Inventory,
  dropDown
});
