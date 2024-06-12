import request from "../utils/request";

export function GET_GetAllPay(payload) {
  return request.get("/Setting/getSettingPay", payload);
}

export function POST_AddPayType(payload) {
  return request.post("/Setting/addSettingPay", payload);
}
