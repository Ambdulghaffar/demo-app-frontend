"use server";

import axios from "axios";
import { LoginDto, RegisterDto, User } from "../models/user.models";
import environment from "@/config/environment.config";

const {
  api: {
    rest: {
      endpoints: { users: userUrl },
    },
  },
} = environment;

export const RegisterUser = async (
  userData: Partial<RegisterDto>
): Promise<User> =>
  axios
    .post<User>(`${userUrl}/register`, userData)
    .then((Response) => Response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      const err = error?.response?.data?.message;
      throw new Error(err);
    });



export async function LoginUser(Logindata: Partial<LoginDto>): Promise<User> {
  return axios
    .post<User>(`${userUrl}/login`, Logindata)
    .then((response) => {
      return response.data;
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      const err = error?.response?.data?.message;
      throw new Error(err);
    });
}
