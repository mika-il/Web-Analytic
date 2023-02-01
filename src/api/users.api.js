import { httpClient_PCP } from "./httpClient";

const Login = payload =>
  httpClient_PCP.post("/post/login", {
    username: payload.username,
    password: payload.password,
    is_ys: payload.is_ys ? payload.is_ys : false
  });

export { Login }
