/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
    ];
  },
  basePath: "/blog",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.pixabay.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
