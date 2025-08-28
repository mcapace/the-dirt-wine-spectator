import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://www.googletagmanager.com https://www.google-analytics.com https://*.elfsight.com https://cdn.jwplayer.com https://*.jwplayer.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.elfsight.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob: https://*.elfsight.com https://*.instagram.com https://cdn.jwplayer.com https://*.jwplayer.com",
              "connect-src 'self' https://static.elfsight.com https://www.google-analytics.com https://*.elfsight.com https://*.instagram.com https://cdn.jwplayer.com https://*.jwplayer.com",
              "frame-src 'self' https://static.elfsight.com https://*.elfsight.com https://*.instagram.com https://cdn.jwplayer.com https://*.jwplayer.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        // Video optimization headers for high-quality playback
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Encoding',
            value: 'identity',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'commondatastorage.googleapis.com', 'cdn.jwplayer.com'],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable compression for video files
  experimental: {
    optimizePackageImports: [],
  },
}

export default nextConfig;
