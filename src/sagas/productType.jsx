import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import {
  POST_AddProductType,
  GET_AllProductType,
  PUT_EditProductType,
  DELETE_DelProductType,
} from "../services/productType";

function* GET_AllProductTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    const { Token } = yield call(getToken);
    const response = yield call(GET_AllProductType, payload);
    yield put({ type: "SAVE_AllProductType", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddProductTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    const { Token } = yield call(getToken);
    yield call(POST_AddProductType, payload, Token);
    const response = yield call(GET_AllProductType, payload);
    yield put({ type: "SAVE_AllProductType", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_EditProductTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    const { Token } = yield call(getToken);
    yield call(PUT_EditProductType, payload, Token);
    const response = yield call(GET_AllProductType, payload);
    yield put({ type: "SAVE_AllProductType", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* DELETE_DelProductTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "刪除中",
      message: "刪除",
    });

    const { Token } = yield call(getToken);
    yield call(DELETE_DelProductType, payload, Token);
    const response = yield call(GET_AllProductType, payload);
    yield put({ type: "SAVE_AllProductType", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_AllProductType", GET_AllProductTypeEffect);
  yield takeLatest("POST_AddProductType", POST_AddProductTypeEffect);
  yield takeLatest("PUT_EditProductType", PUT_EditProductTypeEffect);
  yield takeLatest("DELETE_DelProductType", DELETE_DelProductTypeEffect);
}
