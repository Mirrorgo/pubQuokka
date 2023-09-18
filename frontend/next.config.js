/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://67.219.111.154:8090/api/:path*', // 将请求代理到后端
  //       // http://67.219.111.154:8090/api/user/login
  //     },
  //   ]
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
