"use server";

import axios from "axios";
import environment from "@/config/environment.config";
import { AuthResponse, LoginDto, RegisterDto } from "@/features/auth/types/auth.types";

const {
  api: {
    rest: {
      endpoints: { auth: authUrl }
    },
  },
} = environment;

export const registerUser = async (
  userData: Partial<RegisterDto>
): Promise<AuthResponse> => {
  try {
    const { data } = await axios.post<AuthResponse>(`${authUrl}/register`, userData);
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const err = error?.response?.data?.message || "Erreur lors de l'inscription";
    throw new Error(err);
  }
};


// pas utilsé pour le moment, car on utilise la route /auth/login pour se connecter avec next-auth
export async function loginUser(loginData: Partial<LoginDto>): Promise<AuthResponse> {
  return (
    axios
      .post<AuthResponse>(`${authUrl}/login`, loginData)
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