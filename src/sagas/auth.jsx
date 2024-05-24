import _ from "lodash";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { setToken, removeToken, getToken } from "../utils/token";
import {
  POST_Login,
  POST_Register,
  POST_ForgotPassword } from "../services/auth";
// import config from "../config";
// const domain = config.domain;



function* POST_RegisterEffect({ payload, callback, loading }) {
  try {
    if (loading) loading(true);
    yield call(POST_Register, payload);
    if (loading) loading(false);
    if (callback) callback();
  } catch (error) {
    console.log(error);
    if (loading) loading(false);
    yield handleError(error);
  }
}

function* POST_LoginEffect({ payload, callback, loading }) {
  try {
    if (loading) loading(true);
    const { data } = yield call(POST_Login, payload);
    yield call(setToken, data);
    if (loading) loading(false);
    if (callback) callback();
  } catch (error) {
    console.error("login error:", error);
    if (loading) loading(false);
    yield handleError(error);
  }
}

function* POST_ForgotPasswordEffect({ payload, callback, loading }) {
  try {
    if (loading) loading(true);

    const { data } = yield call(POST_ForgotPassword, payload);

    if (loading) loading(false);
    if (callback) callback(data);
  } catch (error) {
    if (callback) callback(_.get(error, "response.data"));
    if (loading) loading(false);
    yield handleError(error);
  }
}



export default function* Example() {
  yield takeLatest("POST_Register", POST_RegisterEffect);
  yield takeLatest("POST_Login", POST_LoginEffect);
  yield takeLatest("POST_ForgotPassword", POST_ForgotPasswordEffect);
}
