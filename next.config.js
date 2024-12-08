/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Remove these in production
  eslint: {
    ignoreDuringBuilds: false, // Change to false
  },
  typescript: {
    ignoreBuildErrors: false, // Change to false
  },
  // Add this to ensure proper static optimization
  experimental: {
    optimizeFonts: true,
  },
};

module.exports = nextConfig;
