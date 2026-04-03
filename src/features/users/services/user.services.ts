"use server";

import axios from "axios";
import { User, UserDto } from "../types/user.types";
import environment from "@/config/environment.config";

const {
  api: {
    rest: {
      endpoints: { users: userUrl }
    },
  },
} = environment;


export const getUserById = async (id: number): Promise<User | null> => {
  return axios
    .get<User>(`${userUrl}/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Erreur getUserById", error);
      return null;
    });
};

export async function getAllUsers(): Promise<UserDto[]> {
  return axios
    .get<UserDto[]>(`${userUrl}/userDto`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Erreur getAllUsers", error);
      return [];
    });
}



export const createUser = async (userData: Partial<User>): Promise<User> => {
  return (
    axios
      .post<User>(`${userUrl}/register`, userData)
      .then((res) => res.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        const err = error?.response?.data?.message || "Erreur lors de la création de l'utilisateur";
        throw new Error(err);
      })
  );
};

export async function updateUser(userData: Partial<User>): Promise<User> {
  return axios
    .put<User>(`${userUrl}/${userData.id}`, userData)
    .then((response) => {
      return response.data;
    });
}



export const deleteUser = async (id: number): Promise<void> => {
  return axios.delete<void>(`${userUrl}/${id}`).then((res) => res.data);
};
