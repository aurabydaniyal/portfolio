
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["ouch-storage-backfield.ngrok-free.dev"],

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
