/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      }
    ]
  },
  basePath: '/blog',
  reactStrictMode: true,
}

module.exports = nextConfig
