import request from "../utils/request";

export function GET_GetAllProduct(payload) {
  return request.get("/Product/getAllProduct", payload);
}

export function POST_AddProduct(payload) {
  return request.post("/Product/addProduct", payload);
}

export function PUT_EditProduct(payload) {
  return request.put("/Product/editProduct", payload);
}

export function PUT_DelProduct(payload) {
  return request.put("/Product/deleteProduct", payload);
}

export function POST_AddProductCsv(payload) {
  return request.post("/Product/csvAddProduct", payload);
}

export function PUT_EditProductImg(payload) {
  return request.put("/Product/editProductImg", payload);
}

export function PUT_DelProductImg(payload) {
  return request.put("/Product/deleteProductImg", payload);
}