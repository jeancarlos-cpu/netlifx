/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  images: {
    domains: ['i.ytimg.com'],
  },
};

module.exports = nextConfig;
