/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  // Image optimization
  // To reduce Vercel Image Optimization storage/requests (Transformations, Cache Writes, Cache Reads)
  // set `unoptimized: true` so Next.js serves images as-is and does not use Vercel's image optimizer.
  // This will immediately stop new cache writes/reads and transformations. Existing cached images
  // in Vercel may still consume storage until purged via the Vercel dashboard.
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;