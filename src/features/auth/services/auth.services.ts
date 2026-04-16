"use server";

import { handleApiError } from "@/lib/axios/handle-api-error";
import apiPublicClient from "@/lib/axios/api-public-client"; //  pas de token
import { AUTH_ENDPOINTS } from "../constants/auth.endpoints";
import type {
  AuthResponse,
  RegisterDto,
} from "@/features/auth/types/auth.types";

export const registerUser = async (
  userData: Partial<RegisterDto>,
): Promise<AuthResponse> => {
/*   console.log("🚀 registerUser appelé avec:", userData);
  console.log("🌐 URL:", AUTH_ENDPOINTS.register);
  console.log("🔗 baseURL:", apiPublicClient.defaults.baseURL);
  console.log("AUTH_ENDPOINTS:", AUTH_ENDPOINTS); */
  try {
    const { data } = await apiPublicClient.post<AuthResponse>(
      AUTH_ENDPOINTS.register,
      userData,
    );
    //console.log("✅ registerUser succès:", data);
    return data;
  } catch (error) {
    //console.log("❌ registerUser erreur brute:", error);
    return handleApiError(error, "registerUser");
  }
};
