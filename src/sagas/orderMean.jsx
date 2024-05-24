import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import {
  GET_GetAllOrder,
  POST_AddOrder,
  POST_EditStsOrder,
  PUT_CancelOrder,
} from "../services/orderMean";

function* GET_GetAllOrderEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_GetAllOrder, payload);
    yield put({ type: "SAVE_AllOrder", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddOrderEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_AddOrder, payload);
    const response = yield call(GET_GetAllOrder, payload);
    yield put({ type: "SAVE_AllOrder", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_EditStsOrderEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_EditStsOrder, payload);
    const response = yield call(GET_GetAllOrder, payload);
    yield put({ type: "SAVE_AllOrder", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_CancelOrderEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "取消訂單中",
      message: "取消訂單",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_CancelOrder, payload);
    const response = yield call(GET_GetAllOrder, payload);
    yield put({ type: "SAVE_AllOrder", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_GetAllOrder", GET_GetAllOrderEffect);
  yield takeLatest("POST_AddOrder", POST_AddOrderEffect);
  yield takeLatest("POST_EditStsOrder", POST_EditStsOrderEffect);
  yield takeLatest("PUT_CancelOrder", PUT_CancelOrderEffect);
}
