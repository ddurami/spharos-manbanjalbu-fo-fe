import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
      },
      {
        protocol: "https",
        hostname: "image.istarbucks.co.kr",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // AWS S3 이미지 허용
      },
    ],
  },
};

export default nextConfig;