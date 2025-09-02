/** @type {import('next').NextConfig} */
const nextConfig = {
  // Conditional static export - only for Render
  ...(process.env.RENDER === 'true' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Fix workspace root warning
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;
