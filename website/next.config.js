const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    DOMAIN: process.env.REACT_APP_DOMAIN,
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  },
};

module.exports = nextConfig;
