/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { // Add this section
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**', // Allow any path on this hostname
      },
      // Add other allowed domains here if needed
    ],
  },
};

module.exports = nextConfig;
