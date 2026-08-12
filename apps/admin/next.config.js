/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@pho-minh/ui',
    '@pho-minh/design-tokens',
    '@pho-minh/api-client',
    '@pho-minh/shared-types',
  ],
  reactStrictMode: true,
  // Bắt buộc chặn Google index toàn bộ Admin (mục 4 tài liệu FE).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;
