import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/static/**",
      },
      {
        protocol: "http",
        hostname: "54.180.2.174",
        pathname: "/static/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://54.180.2.174/:path*" },
    ];
  },
};

export default nextConfig;
