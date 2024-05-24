import request from "../utils/request";

export function GET_GetAllOrder(payload) {
  return request.get("/OrderMean/getAllOrder", payload);
}

export function POST_AddOrder(payload) {
  return request.post("/OrderMean/addOrder", payload);
}

export function POST_EditStsOrder(payload) {
  return request.post("/OrderMean/editStsOrder", payload);
}

export function PUT_CancelOrder(payload) {
  return request.put("/OrderMean/cancelOrder", payload);
}
