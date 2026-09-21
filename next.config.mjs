/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The old single menu page is split into /drinks and /eats.
    // Keep old /menu links and QR codes alive.
    return [{ source: "/menu", destination: "/drinks", permanent: true }];
  },
};

export default nextConfig;
