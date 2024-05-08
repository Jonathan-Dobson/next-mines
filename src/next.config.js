/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  // avatars.githubusercontent.com
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
