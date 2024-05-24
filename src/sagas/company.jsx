import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import {
  POST_AddCompany,
  GET_AllCompany,
  PUT_EditCompany,
  POST_AddCompanyCsv,
  PUT_DelCompany
} from "../services/company";

function* GET_AllCompanyEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    const { Token } = yield call(getToken);
    const response = yield call(GET_AllCompany, payload);
    yield put({ type: "SAVE_AllCompany", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddCompanyEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    const { Token } = yield call(getToken);
    yield call(POST_AddCompany, payload, Token);
    const response = yield call(GET_AllCompany, payload);
    yield put({ type: "SAVE_AllCompany", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_EditCompanyEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    const { Token } = yield call(getToken);
    yield call(PUT_EditCompany, payload, Token);
    const response = yield call(GET_AllCompany, payload);
    yield put({ type: "SAVE_AllCompany", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddCompanyCsvEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    const { Token } = yield call(getToken);
    yield call(POST_AddCompanyCsv, payload, Token);
    const response = yield call(GET_AllCompany, payload);
    yield put({ type: "SAVE_AllCompany", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_DelCompanyEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    const { Token } = yield call(getToken);
    yield call(PUT_DelCompany, payload, Token);
    const response = yield call(GET_AllCompany, payload);
    yield put({ type: "SAVE_AllCompany", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_AllCompany", GET_AllCompanyEffect);
  yield takeLatest("POST_AddCompany", POST_AddCompanyEffect);
  yield takeLatest("PUT_EditCompany", PUT_EditCompanyEffect);
  yield takeLatest("POST_AddCompanyCsv", POST_AddCompanyCsvEffect);
  yield takeLatest("PUT_DelCompany", PUT_DelCompanyEffect);
}
