import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude test files from being processed
      config.module.rules.push({
        test: /\.test\.js$/,
        use: "ignore-loader",
      });
    }
    return config;
  },
};

export default nextConfig;
