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
    SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
};

module.exports = nextConfig;
