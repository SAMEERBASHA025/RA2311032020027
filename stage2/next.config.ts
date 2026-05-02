import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://20.207.122.201/:path*',
      },
    ];
  },
};

export default nextConfig;
