const path = require('path');
/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
]);

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
    WEATHER_API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
    WEATHER_URL: process.env.REACT_APP_WEATHER_URL,
    HOSTING_URL: process.env.REACT_APP_HOSTING_URL,
  },
};

module.exports = withTM(nextConfig);
