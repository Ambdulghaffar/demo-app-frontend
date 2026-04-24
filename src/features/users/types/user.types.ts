export type User = {
  id: number;
  username: string;
  email: string;
  phone:string;
  address: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
  createdAt: string;
  updatedAt: string;
};

export type UserDto = {
  id: number;
  username: string;
  email: string;
  phone:string;
  address: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
  createdAt: string;
}

export type UserStats = {
  total: number;
  admins: number;
  managers: number;
  clients: number;
};



