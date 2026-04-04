import { User, UserDto } from "../types/user.types";
import apiClient from "@/lib/axios/api-client";
import { handleApiError } from "@/lib/axios/handle-api-error";
import { USERS_ENDPOINTS } from "../constants/users.endpoints";
import { getAuthHeaders } from "@/lib/auth/get-auth-headers";

export const getAllUsers = async (): Promise<UserDto[]> => {
  console.log("🚀 getAllUsers appelé");
  console.log("🔗 baseURL:", apiClient.defaults.baseURL);
  console.log("🌐 endpoint:", USERS_ENDPOINTS.dto);
  try {
    const { data } = await apiClient.get<UserDto[]>(USERS_ENDPOINTS.dto, {
      headers: await getAuthHeaders(),
    });
    console.log("✅ getAllUsers succès:", data);
    return data;
  } catch (error) {
    console.log("❌ erreur brute:", error);
    return handleApiError(error, "getAllUsers");
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const { data } = await apiClient.get<User>(USERS_ENDPOINTS.byId(id));
    return data;
  } catch (error) {
    return handleApiError(error, `getUserById (id: ${id})`);
  }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await apiClient.post<User>(
      USERS_ENDPOINTS.register,
      userData,
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createUser");
  }
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await apiClient.put<User>(
      USERS_ENDPOINTS.byId(userData.id!),
      userData,
    );
    return data;
  } catch (error) {
    return handleApiError(error, "updateUser");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete<void>(USERS_ENDPOINTS.byId(id));
  } catch (error) {
    return handleApiError(error, "deleteUser");
  }
};
