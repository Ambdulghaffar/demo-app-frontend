import axios from "axios";
import environment from "@/config/environment.config";

// Pas de getSession — pas de problème côté serveur
export const apiPublicClient = axios.create({
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

apiPublicClient.interceptors.response.use(
  (response) => {
    console.log(`[Public API Response] Success: ${response.status}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    console.error(`[Public API Error] Status: ${status || "Network Error"}`);
    return Promise.reject(error);
  }
);

export default apiPublicClient;