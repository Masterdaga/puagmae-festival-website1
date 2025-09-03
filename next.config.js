/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for portability across any static host
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;
