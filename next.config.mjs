/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./prisma/dev.db', './prisma/schema.prisma'],
    },
  },
};

export default nextConfig;
