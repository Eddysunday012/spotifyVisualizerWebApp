/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "spotify-logic"],
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
