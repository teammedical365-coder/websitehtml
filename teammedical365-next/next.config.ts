import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:product-:location.html',
        destination: '/:product/:location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
