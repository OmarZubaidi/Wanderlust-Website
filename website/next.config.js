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
    AMADEUS_API_KEY: process.env.REACT_APP_AMADEUS_API_KEY,
    AMADEUS_API_SECRET: process.env.REACT_APP_AMADEUS_API_SECRET,
  },
};

module.exports = nextConfig;
