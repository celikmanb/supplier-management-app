/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/places',
  //       permanent: true,
  //     },
  //   ]
  // },
}
