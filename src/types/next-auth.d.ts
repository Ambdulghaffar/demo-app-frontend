import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
    accessToken?: string;
  }
}
