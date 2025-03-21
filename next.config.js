/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  // Maintain the same base path if needed
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.VITE_BASE_PATH || ""
      : "",
};

module.exports = nextConfig;
