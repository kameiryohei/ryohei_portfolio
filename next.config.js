/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  env: {
    WEATHER_API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
  },
};
