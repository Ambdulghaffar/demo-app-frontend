import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type SpringLoginResponse = {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
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

				if (!data.accessToken || !data.refreshToken || !data.email || !data.role || !data.expiresIn) {
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
				token.refreshToken = user.refreshToken;
				token.expiresAt = Date.now() + (user.expiresIn * 1000);
				return token;
			}

			// Check if access token is expired
			if (token.expiresAt && Date.now() >= token.expiresAt) {
				try {
					const apiBaseUrl = process.env.INV_MGT_BASEURL ?? defaultApiBaseUrl;
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
						const data = (await response.json()) as Partial<SpringLoginResponse>;
						if (data.accessToken && data.refreshToken && data.expiresIn) {
							token.accessToken = data.accessToken;
							token.refreshToken = data.refreshToken;
							token.expiresAt = Date.now() + (data.expiresIn * 1000);
						} else {
							// Invalid response, force logout
							throw new Error("Invalid refresh response");
						}
					} else {
						// Refresh failed, force logout
						throw new Error("Refresh token failed");
					}
				} catch (error) {
					console.error("Error refreshing token:", error);
					// Force logout on error
					throw new Error("Token refresh failed");
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
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
