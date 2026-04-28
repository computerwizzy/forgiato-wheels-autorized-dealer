import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'forgiato.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.forgiato.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
