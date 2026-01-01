/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for Nginx deployment
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Turbopack config for Next.js 16 (Turbopack handles fs fallback automatically)
  turbopack: {},
};

export default nextConfig;
