/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // All photography is downloaded into /public/images and referenced locally.
    // If you ever need a remote host, whitelist it here.
    remotePatterns: [],
  },
};

export default nextConfig;
