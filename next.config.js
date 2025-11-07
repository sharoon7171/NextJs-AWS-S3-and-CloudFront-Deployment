/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serverless Framework compatibility
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Ensure images work with S3/CloudFront
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

