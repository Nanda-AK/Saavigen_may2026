import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  ? process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/$/, "")
  : "";

const nextConfig: NextConfig = {
  output: "export",
  // Pin the project root. Without this, a stray package-lock.json in a parent
  // folder (e.g. the user's home directory) makes Next guess the wrong root.
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
