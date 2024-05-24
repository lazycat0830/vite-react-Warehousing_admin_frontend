import { all } from 'redux-saga/effects';
import globalSaga from './global'; // 顯式導入所有的 saga
import orderMean from "./orderMean";
import auth from "./auth";
import product from './product';
import productType from './productType';
import company from "./company";
import Inventory from "./Inventory";
import dropDown from "./dropDown";

const sagas = [
  globalSaga,
  orderMean,
  auth,
  product,
  productType,
  company,
  Inventory,
  dropDown
];

export default function* rootSaga() {
  yield all(sagas.map(saga => saga()));
}
