import request from "../utils/request";

export function POST_AddCompany(payload, token) {
  return request.post("/Company/addCompany", payload);
}

export function GET_AllCompany(payload) {
  return request.get("/Company/getAllCompany", payload);
}

export function PUT_EditCompany(payload, token) {
  return request.put("/Company/editCompany", payload);
}

export function POST_AddCompanyCsv(payload, token) {
  return request.post("/Company/csvAddCompany", payload);
}

export function PUT_DelCompany(payload, token) {
  return request.put("/Company/deleteCompany", payload);
}
