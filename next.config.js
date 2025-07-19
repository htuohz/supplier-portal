/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  webpack: config => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

module.exports = nextConfig;
