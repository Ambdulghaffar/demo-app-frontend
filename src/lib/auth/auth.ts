import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type SpringLoginResponse = {
	token: string;
	email: string;
	role: string;
};

const defaultApiBaseUrl = "http://localhost:8080/api";

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

				const apiBaseUrl = process.env.INV_MGT_BASEURL ?? defaultApiBaseUrl;
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

				const data = (await response.json()) as Partial<SpringLoginResponse>;

				if (!data.token || !data.email || !data.role) {
					return null;
				}

				return {
					id: data.email,
					email: data.email,
					name: data.email,
					roles: [data.role],
					accessToken: data.token,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
				token.email = user.email;
				token.name = user.name;
				token.roles = user.roles;
				token.accessToken = user.accessToken;
				return token;
			}

			// Refresh token flow is intentionally disabled for now.
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

			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
