import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Modern App Router optimizations
  skipTrailingSlashRedirect: true,  // Prevents legacy redirect behavior
  skipMiddlewareUrlNormalize: true, // Avoids legacy URL handling
  
  // Recommended for Vercel deployments
  output: process.env.VERCEL ? 'standalone' : undefined,
};

export default nextConfig;
