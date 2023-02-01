import axios from "axios";
import { decodeToken } from "@/utils/convertToken";
import store from "../store/store";
import router from "../router.js";
const httpClient_PCP = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY + "/req/pcp",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});
const httpClient_ANALYTIC = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY + "/req/pca",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const httpClient_ANALYTIC_FILE = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY + "/req/pca",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "arraybuffer"
});
const httpClient_PCP_ANALYTIC_FILE = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY + "/req/pcp",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "arraybuffer"
});

const authInterceptor = config => {
  try {
    config.headers["Authorization"] = `Bearer ${decodeToken(
      localStorage.getItem("uid")
    )}`;
    return config;
  } catch (err) {
    console.log(err);

    localStorage.removeItem("uid");
    localStorage.removeItem("user");
    window.location = "/";
  }
};

httpClient_PCP.interceptors.request.use(authInterceptor);
httpClient_PCP_ANALYTIC_FILE.interceptors.request.use(authInterceptor);

// // interceptor to catch errors
const errorInterceptor = error => {
  // all the error responses
  switch (error.response.status) {
    case 401: // authentication error, logout the user
      // notify.warn("Please login again", "Session Expired");
      store.dispatch("Auth/Logout");
      // router.push("/login");
      break;

    default:
      console.error(error.response.status, error.message);
    // notify.error("Server Error");
  }
  return Promise.reject(error);
};

// // Interceptor for responses
const responseInterceptor = response => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
};

httpClient_PCP.interceptors.response.use(responseInterceptor, errorInterceptor);

export {
  httpClient_PCP,
  httpClient_ANALYTIC,
  httpClient_ANALYTIC_FILE,
  httpClient_PCP_ANALYTIC_FILE
};
