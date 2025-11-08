/** @type {import('next').NextConfig} */
const nextConfig = {
  // AWS Amplify configuration for serverless deployment
  // AWS Amplify automatically handles the build output and deployment
  images: {
    unoptimized: true, // Required for S3/CloudFront deployment
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;

