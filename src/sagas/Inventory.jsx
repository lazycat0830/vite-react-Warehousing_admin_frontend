import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import {
  GET_GetInventory,
  POST_AddPurchase,
  POST_FinishPurchase,
  PUT_EditInfQuantity,
  GET_AllPurchase,
} from "../services/Inventory";

function* GET_GetInventoryEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_GetInventory, payload);
    yield put({ type: "SAVE_AllInventory", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddPurchaseEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_AddPurchase, payload);
    const response = yield call(GET_GetInventory, payload);
    yield put({ type: "SAVE_AllInventory", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_EditInfQuantityEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_EditInfQuantity, payload);
    const response = yield call(GET_GetInventory, payload);
    yield put({ type: "SAVE_AllInventory", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_FinishPurchaseEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "入庫中",
      message: "入庫",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_FinishPurchase, payload);
    const response = yield call(GET_GetInventory, payload);
    yield put({ type: "SAVE_AllInventory", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* GET_AllPurchaseEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_AllPurchase, payload);
    yield put({ type: "SAVE_AllPurchase", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_GetInventory", GET_GetInventoryEffect);
  yield takeLatest("POST_AddPurchase", POST_AddPurchaseEffect);
  yield takeLatest("PUT_EditInfQuantity", PUT_EditInfQuantityEffect);
  yield takeLatest("POST_FinishPurchase", POST_FinishPurchaseEffect);
  yield takeLatest("GET_AllPurchase", GET_AllPurchaseEffect);
}
