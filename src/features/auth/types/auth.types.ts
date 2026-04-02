export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  email: string;
  role: string; // ou UserRole si tu as un enum
}

export interface RegisterDto {
  username: string;
  email: string;
  phone:string;
  address: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

