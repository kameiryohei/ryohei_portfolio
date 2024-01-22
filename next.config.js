/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },

  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};
