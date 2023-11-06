/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "tailwindui.com",
      "images.unsplash.com",
      "localhost",
    ],
  },
};
