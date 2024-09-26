/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
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
