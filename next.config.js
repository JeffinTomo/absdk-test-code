/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@ab-org/predicate-market-sdk',
    '@ab-org/sdk-core',
    '@tomo-inc/cubist-sig-sdk',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        got: false,
        starknet: false,
      };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        zlib: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
