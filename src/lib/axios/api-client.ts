import axios from "axios";
import environment from "@/config/environment.config";

export const apiClient = axios.create({
  baseURL: environment.api.rest.baseUrl,
  timeout: environment.http.request.timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.error(`[API Error] Status: ${status || "Network Error"}`);
    return Promise.reject(error);
  }
);

export default apiClient;