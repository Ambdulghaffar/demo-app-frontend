"use server";

import { LoginDto, RegisterDto, User } from "../models/user.models";
import api from "@/config/axiosConfig";

export const RegisterUser = async (
  userData: Partial<RegisterDto>
): Promise<User> =>
  api
    .post<User>("/register", userData)
    .then((Response) => Response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      const err = error?.response?.data?.message;
      throw new Error(err);
    });

export async function LoginUser(Logindata: Partial<LoginDto>): Promise<User> {
  return api
    .post<User>("/login", Logindata)
    .then((response) => {
      return response.data;
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      const err = error?.response?.data?.message;
      throw new Error(err);
    });
}
