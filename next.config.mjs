/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // Fix the assetPrefix to work with next/font
  // For GitHub Pages, we need to use a path prefix that matches the repository name
  // If your repo is at username.github.io/repo-name, use '/repo-name'
  basePath: process.env.NODE_ENV === "production" ? "/QCMcalc" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/QCMcalc" : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
