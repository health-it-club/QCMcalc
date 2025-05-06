/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // For example, if your repo is "username/my-nextjs-app", set basePath: '/my-nextjs-app'
  basePath: process.env.NODE_ENV === "production" ? "/QCMcalc" : "",
  // If you're using images, you might need to adjust this
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
