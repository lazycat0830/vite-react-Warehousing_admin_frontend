import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import { GET_GetAllPay, POST_AddPayType } from "../services/setting";

function* GET_GetAllPayEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_GetAllPay, payload);
    yield put({ type: "SAVE_AllPayType", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddPayTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_AddPayType, payload);
    const response = yield call(GET_GetAllPay, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_GetAllPay", GET_GetAllPayEffect);
  yield takeLatest("POST_AddPayType", POST_AddPayTypeEffect);
}
