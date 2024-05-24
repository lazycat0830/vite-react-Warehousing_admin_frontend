import _ from "lodash";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { handleError } from "../utils/error";
import { getToken } from "../utils/token";
import { Loaded, Loading } from "../utils/loading";
import { GET_AllCompany } from "../services/company";
import { GET_AllProductType } from "../services/productType";

const CompanyDropdown = (data) =>
  _.map(data, (item) => {
    return { label: item.com_name, value: item.com_id };
  });

const ProductTypeDropdown = (data) =>
  _.map(data, (item) => {
    return { label: item.type_title, value: item.type_id };
  });

function* GET_dropDownInventoryEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_AllCompany, payload);
    yield put({
      type: "SAVE_dropDownCompany",
      payload: CompanyDropdown(response.data),
    });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

function* GET_dropDownProductTypeEffect({ payload }) {
  try {
    yield Loading({
      color: "cyan",
      title: "查詢中",
      message: "查詢",
    });

    // const { Token } = yield call(getToken);
    const response = yield call(GET_AllProductType, payload);
    yield put({
      type: "SAVE_dropDownProductType",
      payload: ProductTypeDropdown(response.data),
    });
    yield Loaded();
  } catch (error) {
    console.log(error);
    yield Loaded();
    yield handleError(error);
  }
}

export default function* Example() {
  yield takeLatest("GET_dropDownInventory", GET_dropDownInventoryEffect);
  yield takeLatest("GET_dropDownProductType", GET_dropDownProductTypeEffect);
}
