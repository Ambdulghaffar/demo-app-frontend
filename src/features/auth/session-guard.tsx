"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    // Si le refresh token a expiré au backend, on déconnecte proprement
    if (session?.error === "RefreshAccessTokenError") {
      console.warn("Session expirée, redirection vers login...");
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return <>{children}</>;
}
