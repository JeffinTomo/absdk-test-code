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
  // next.config.ts
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default withNextIntl(nextConfig);
