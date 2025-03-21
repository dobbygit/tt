module.exports = { reactStrictMode: true, images: { domains: ["images.unsplash.com"] }, basePath: process.env.NODE_ENV === "production" ? (process.env.VITE_BASE_PATH || "") : "" };
