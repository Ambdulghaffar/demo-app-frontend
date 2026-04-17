import environment from "@/config/environment.config";
import { AuthResponse } from "@/features/auth/types/auth.types";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const apiBaseUrl = environment.api.rest.baseUrl;
        const loginEndpoint = `${apiBaseUrl}/auth/login`;

        const response = await fetch(loginEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const data = (await response.json()) as Partial<AuthResponse>;

        if (
          !data.accessToken ||
          !data.refreshToken ||
          !data.email ||
          !data.username ||
          !data.role ||
          !data.expiresIn
        ) {
          return null;
        }

        return {
          id: data.email,
          email: data.email,
          name: data.username,
          roles: [data.role],
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("--- Callback JWT ---");
      console.log("User object:", user);
      console.log("Initial token:", token);

      // ÉTAPE A : Login Initial
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.roles = (user as any).roles;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // Calcul du timestamp d'expiration : MAINTENANT + Durée du backend
        token.expiresAt = Date.now() + user.expiresIn * 1000;
      }

      // ÉTAPE B : Vérification si encore valide (avec marge de 30s)
      if (Date.now() < (token.expiresAt as number) - 3000) {
        return token;
      }

      // ÉTAPE C : Le Token a expiré, on tente le Refresh
      if (token.expiresAt && Date.now() >= token.expiresAt) {
        try {
          const apiBaseUrl = environment.api.rest.baseUrl;
          const refreshEndpoint = `${apiBaseUrl}/auth/refresh`;

          const response = await fetch(refreshEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          });

          const refreshedTokens = await response.json();

          if (!response.ok) {
            throw refreshedTokens;
          }

          return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
            expiresAt: Date.now() + refreshedTokens.expiresIn * 1000,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // Le refresh a échoué, on invalide la session
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string[];
        session.accessToken = token.accessToken as string;
        session.error = token.error as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
