"use server";

import axios from "axios";
import { LoginDto, RegisterDto, User, UserDto } from "../models/user.models";
import environment from "@/config/environment.config";

const {
  api: {
    rest: {
      endpoints: { users: userUrl },
    },
  },
} = environment;

export async function getAllUsers(): Promise<UserDto[]> {
  return axios
    .get<UserDto[]>(`${userUrl}/userDto`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Erreur getAllUsers", error);
      return [];
    });
}

export const registerUser = async (
  userData: Partial<RegisterDto>
): Promise<User> =>
  axios
    .post<User>(`${userUrl}/register`, userData)
    .then((response) => response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      const err = error?.response?.data?.message;
      throw new Error(err);
    });

export async function loginUser(loginData: Partial<LoginDto>): Promise<User> {
  return (
    axios
      .post<User>(`${userUrl}/login`, loginData)
      .then((response) => {
        return response.data;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        const err = error?.response?.data?.message;
        throw new Error(err);
      })
  );
}

export const deleteUser = async (id: number): Promise<void> => {
  return axios.delete<void>(`${userUrl}/${id}`).then((res) => res.data);
};
