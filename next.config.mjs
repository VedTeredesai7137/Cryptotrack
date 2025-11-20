/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Optimize for production
  experimental: {
    // Enable output file tracing to reduce bundle size
    outputFileTracingRoot: process.cwd(),
  },
};

export default nextConfig;
