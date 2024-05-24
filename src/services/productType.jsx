import request from "../utils/request";

export function POST_AddProductType(payload, token) {
  return request.post("/ProductType/addProductType", payload);
}

export function GET_AllProductType(payload) {
  return request.get("/ProductType/getAllProductType", payload);
}

export function PUT_EditProductType(payload, token) {
  return request.put("/ProductType/editProductType", payload);
}

export function DELETE_DelProductType(payload, token) {
  return request.put("/ProductType/delProductType", payload);
}
