/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Configure basePath if your site is not at the root of the domain
  // basePath: '/your-repo-name',
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // This setting helps with GitHub Pages deployment
  // Remove this if you're not deploying to GitHub Pages
  assetPrefix: process.env.NODE_ENV === "production" ? "." : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
