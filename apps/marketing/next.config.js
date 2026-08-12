/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@pho-minh/ui',
    '@pho-minh/design-tokens',
    '@pho-minh/api-client',
    '@pho-minh/shared-types',
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
