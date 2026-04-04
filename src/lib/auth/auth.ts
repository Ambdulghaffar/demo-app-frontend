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
          !data.role ||
          !data.expiresIn
        ) {
          return null;
        }

        return {
          id: data.email,
          email: data.email,
          name: data.email,
          roles: [data.role],
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any; // On utilise "any" ici pour éviter les erreurs de type liées à la nature dynamique du token, mais on s'assure que les propriétés nécessaires sont présentes.
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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

          if (response.ok) {
            const data =
              (await response.json()) as Partial<AuthResponse>;
            return {
              ...token,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresAt: Date.now() + (data.expiresIn ?? 0) * 1000,
              error: undefined, // On reset l'erreur si le refresh réussit
            };
          } else {
            // Si le refresh échoue (ex: refresh token expiré), on ajoute une erreur au token pour gérer la déconnexion côté client
            return { ...token, error: "RefreshAccessTokenError" };
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          // En cas d'erreur (ex: réseau), on considère que le refresh a échoué
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: String(token.sub ?? ""),
        email: String(token.email ?? ""),
        name: String(token.name ?? ""),
        roles: Array.isArray(token.roles) ? token.roles : [],
      };
      session.accessToken = token.accessToken;
	  // EXPOSITION de l'erreur pour le SessionGuard
	  session.error = token.error as "RefreshAccessTokenError" | undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
