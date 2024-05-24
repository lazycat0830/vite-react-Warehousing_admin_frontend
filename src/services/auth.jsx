import request from "../utils/request";

export function POST_Register(payload, token) {
    return request.post("/Auth/register", payload);
  }

export function POST_Login(payload, token) {
  return request.post("/Auth/login", payload);
}

export function POST_ForgotPassword(payload) {
  return request.post("/Auth/forgetpassword", payload );
}
