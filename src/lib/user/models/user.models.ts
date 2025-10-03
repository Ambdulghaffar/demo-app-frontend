export type User = {
  id: number;
  username: string;
  email: string;
  phone:string;
  address: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

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


