import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";

export const getAuthHeaders = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) return {};
  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
};
