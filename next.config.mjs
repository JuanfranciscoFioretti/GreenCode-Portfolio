/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable legacy browser polyfills
  experimental: {
    browsersListForSwc: ['> 0.5%', 'last 2 versions', 'not dead'],
  },
};

export default nextConfig;