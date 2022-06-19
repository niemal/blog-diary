/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      }
    ]
  },
  basePath: '/blog',
  reactStrictMode: true,
}

module.exports = nextConfig
