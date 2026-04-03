"use server";

import { User, UserDto } from "../types/user.types";
import apiClient from "@/lib/axios/api-client";
import { handleApiError } from "@/lib/handle-api-error";
import { USERS_ENDPOINTS } from "../constants/users.endpoints";


export const getAllUsers = async (): Promise<UserDto[]> => {
  try {
    const { data } = await apiClient.get<UserDto[]>(USERS_ENDPOINTS.dto);
    return data;
  } catch (error) {
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
    const { data } = await apiClient.post<User>(USERS_ENDPOINTS.register, userData);
    return data;
  } catch (error) {
    return handleApiError(error, "createUser");
  }
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await apiClient.put<User>(
      USERS_ENDPOINTS.byId(userData.id!),
      userData
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
