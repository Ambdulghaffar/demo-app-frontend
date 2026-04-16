export const USERS_ENDPOINTS = {
  base: "/user",
  dto: "/users",
  byId: (id: number) => `/users/${id}`,
  register: "/users",
} as const;