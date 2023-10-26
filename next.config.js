/** @type {import('next').NextConfig} */

// const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["res.cloudinary.com", "tailwindui.com", "images.unsplash.com"],
  },
};
