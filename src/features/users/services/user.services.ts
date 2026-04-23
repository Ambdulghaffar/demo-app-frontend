import { User, UserDto } from "../types/user.types";
import apiClient from "@/lib/axios/api-client";
import { handleApiError } from "@/lib/axios/handle-api-error";
import { USERS_ENDPOINTS } from "../constants/users.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import axios from "axios";
import { PageResponse } from "@/types/pagination.types";

export const getAllUsers = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "desc",
): Promise<PageResponse<UserDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<UserDto>>(
      USERS_ENDPOINTS.dto,
      {
        headers: await getAuthHeaders(),
        params: { page, size, sortBy, sortDir },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllUsers");
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const { data } = await apiClient.get<User>(USERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    // 404 Spring Boot → null → notFound() dans page.tsx
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    // Tout le reste (500, réseau, 403...) → throw ApiError → error.tsx
    return handleApiError(error, `getUserById (id: ${id})`);
  }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await apiClient.post<User>(
      USERS_ENDPOINTS.register,
      userData,
      {
        headers: await getAuthHeaders(),
      },
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
      {
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "updateUser");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(USERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    return handleApiError(error, `deleteUser (id: ${id})`);
  }
};
