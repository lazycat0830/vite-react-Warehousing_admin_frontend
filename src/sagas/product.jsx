import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import {
  POST_AddProduct,
  GET_GetAllProduct,
  PUT_EditProduct,
  PUT_DelProduct,
} from "../services/product";

function* GET_GetAllProductEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_GetAllProduct, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddProductEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_AddProduct, payload);
    const response = yield call(GET_GetAllProduct, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_EditProductEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_EditProduct, payload);
    const response = yield call(GET_GetAllProduct, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_DelProductEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "刪除中",
      message: "刪除",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_DelProduct, payload);
    const response = yield call(GET_GetAllProduct, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_GetAllProduct", GET_GetAllProductEffect);
  yield takeLatest("POST_AddProduct", POST_AddProductEffect);
  yield takeLatest("PUT_EditProduct", PUT_EditProductEffect);
  yield takeLatest("PUT_DelProduct", PUT_DelProductEffect);
}
