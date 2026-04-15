import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "@auth/prisma-adapter"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
