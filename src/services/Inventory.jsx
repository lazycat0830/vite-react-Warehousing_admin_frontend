import request from "../utils/request";

export function GET_GetInventory(payload) {
  return request.get("/Inventory/getInventory", payload);
}

export function POST_AddPurchase(payload) {
  return request.post("/Inventory/addPurchase", payload);
}

export function PUT_EditInfQuantity(payload) {
  return request.put("/Inventory/editInfQuantity", payload);
}

export function POST_FinishPurchase(payload) {
  return request.post("/Inventory/finishPurchase", payload);
}

export function GET_AllPurchase(payload) {
  return request.get("/Inventory/getAllPurchase", payload);
}
