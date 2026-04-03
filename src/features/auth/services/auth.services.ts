"use server";

import { AuthResponse, RegisterDto } from "@/features/auth/types/auth.types";
import apiClient from "@/lib/axios/api-client";
import { AUTH_ENDPOINTS } from "../constants/auth.endpoints";
import { handleApiError } from "@/lib/handle-api-error";


export const registerUser = async (userData: Partial<RegisterDto>): Promise<AuthResponse> => {
  try {
    const {data} = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.register, userData);
    return data;
  } catch (error) {
    return handleApiError(error,"registerUser");
  }
};
