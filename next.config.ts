import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['sample-videos.com'],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
