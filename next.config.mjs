/** @type {import('next').NextConfig} */

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.google*.com",
        port: "",
      },
    ],
  },
};


export default nextConfig;
