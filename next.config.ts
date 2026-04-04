import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // ✅ Tout /api/* SAUF /api/auth/* qui appartient à next-auth
        source: "/api/((?!auth).*)",
        destination: "http://localhost:8080/api/$1",
      },
    ];
  },
};

export default nextConfig;