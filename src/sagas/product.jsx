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
  POST_AddProductCsv,
  PUT_EditProductImg,
  PUT_DelProductImg
} from "../services/product";

const convertProduct = (data) =>
  _.map(data, (item) => {
    // console.log();
    const pro_style =item["pro_style"].includes("{}")?null:JSON.parse(JSON.parse(item["pro_style"]));
    return {...item, 
      pro_color:pro_style?pro_style.color:[],
      pro_size:pro_style?pro_style.size:[],
      com_id:String(item.com_id),
      type_id:String(item.type_id)  };
  });

function* GET_GetAllProductEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_GetAllProduct, payload);
    console.log(response)
    yield put({ type: "SAVE_AllProduct", payload:convertProduct(response.data) });
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
    const response = yield call(GET_GetAllProductEffect, payload);
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
    const response = yield call(GET_GetAllProductEffect, payload);
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
    const response = yield call(GET_GetAllProductEffect, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* POST_AddProductCsvEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "新增中",
      message: "新增",
    });

    // const { Token } = yield call(getToken);
    yield call(POST_AddProductCsv, payload);
    const response = yield call(GET_GetAllProductEffect, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_EditProductImgEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_EditProductImg, payload);
    const response = yield call(GET_GetAllProductEffect, payload);
    yield put({ type: "SAVE_AllProduct", payload: response.data });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* PUT_DelProductImgEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "修改中",
      message: "修改",
    });

    // const { Token } = yield call(getToken);
    yield call(PUT_DelProductImg, payload);
    const response = yield call(GET_GetAllProductEffect, payload);
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
  yield takeLatest("POST_AddProductCsv", POST_AddProductCsvEffect);
  yield takeLatest("PUT_EditProductImg", PUT_EditProductImgEffect);
  yield takeLatest("PUT_DelProductImg", PUT_DelProductImgEffect);
}
