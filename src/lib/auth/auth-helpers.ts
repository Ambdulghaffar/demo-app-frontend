// src/lib/auth/auth-helpers.ts ✅ rien à changer
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken || session.error === "RefreshAccessTokenError") {
    return {};
  }

  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
};