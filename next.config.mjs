/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // Fix the assetPrefix to work with next/font
  // For GitHub Pages, we need to use a path prefix that matches the repository name
  basePath: process.env.NODE_ENV === "production" ? "/QCMcalc" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/QCMcalc" : "",
  // Add trailing slash to help with static routing
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
