// next.config.ts
import type { NextConfig } from "next";
// next-intl plugin is optional; fall back if missing
let withNextIntl: (cfg: NextConfig) => NextConfig = (cfg) => cfg;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const maybe = require("next-intl/plugin");
  const createNextIntlPlugin = (maybe && maybe.default) ? maybe.default : maybe;
  if (typeof createNextIntlPlugin === "function") {
    // @ts-ignore - plugin factory type is not important here
    withNextIntl = createNextIntlPlugin();
  }
} catch {
  // plugin not installed; continue without it
}

// import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,

  // 接入ab-org新加的
  transpilePackages: [
    "@ab-org/predicate-market-sdk",
    "@ab-org/sdk-core",
    "@tomo-inc/cubist-sig-sdk",
  ],

  // next.config.ts
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    // 接入ab-org新加的
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        os: false,
      };
    }
    // 接入ab-org新加的
    config.module.rules.push({
      test: /node_modules\/@ab-org\/predicate-market-sdk\/.*\.js$/,
      parser: {
        amd: false,
      },
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
