export const USERS_ENDPOINTS = {
  base: "/user",
  dto: "/user/userDto",
  byId: (id: number) => `/user/${id}`,
  register: "/user/register",
} as const;