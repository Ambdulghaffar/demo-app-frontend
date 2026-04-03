import axios from "axios";
import { getSession } from "next-auth/react";
import environment from "@/config/environment.config";

// 1. Définition de la configuration de base (récupérée de tes anciens fichiers)
const baseRequestConfig = {
  baseURL: environment.api.rest.baseUrl,
  timeout: environment.http.request.timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
};

// 2. Création de l'instance UNIQUE
export const apiClient = axios.create(baseRequestConfig);

// 3. Intercepteur de REQUÊTE : Injection du Token JWT
apiClient.interceptors.request.use(
  async (config) => {
    // Récupère la session NextAuth (côté client ou serveur)
    const session = await getSession();
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Intercepteur de RÉPONSE : Logs et Erreurs globales
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] Success: ${response.status}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    console.error(`[API Error] Status: ${status || 'Network Error'}`);
    
    if (status === 401) {
      // Optionnel : tu pourrais forcer un logout ici si le refresh a échoué
    }
    return Promise.reject(error);
  }
);

export default apiClient;
