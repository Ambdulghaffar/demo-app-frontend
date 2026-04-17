import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
    } & DefaultSession["user"];
    accessToken?: string;
    error?: "RefreshAccessTokenError"| string | undefined;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: "RefreshAccessTokenError"| string | undefined;
  }
}
