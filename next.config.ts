import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'commondatastorage.googleapis.com'],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
