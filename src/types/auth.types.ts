export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  email: string;
  role: string; // ou UserRole si tu as un enum
}
