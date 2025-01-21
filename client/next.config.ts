import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, //disable reactStrictMode
  eslint: {
    //Ignore eslint errors during vercel deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    //Ignore typescript errors during vercel deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
