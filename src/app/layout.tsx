import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import Navigation from '@/components/Navigation/Navbar'
import GAListener from './ga-listener'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "The Dirt - Wine Spectator Video Series",
  description: "Discover the stories behind the world's finest wines through our vertical video series. Explore terroir, winemaking traditions, and the unique soils that shape exceptional wines.",
  keywords: "wine, wine spectator, the dirt, vertical video, terroir, winemaking, château margaux, opus one, penfolds, antinori, wine education",
  authors: [{ name: "Wine Spectator" }],
  creator: "Wine Spectator",
  publisher: "Wine Spectator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thedirt.winespectator.com'),
  openGraph: {
    title: "The Dirt - Wine Spectator Video Series",
    description: "Discover the stories behind the world's finest wines through our vertical video series.",
    url: 'https://thedirt.winespectator.com',
    siteName: 'Wine Spectator',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Dirt - Wine Spectator Video Series',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Dirt - Wine Spectator Video Series",
    description: "Discover the stories behind the world's finest wines through our vertical video series.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://thedirt.winespectator.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* Preconnect to optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jwplayer.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#98231f" />
        <meta name="msapplication-TileColor" content="#98231f" />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body className={inter.variable}>
        {/* Google tag (gtag.js) */}
        <Script
          src="d  ahttps://www.googletagmanager.com/gtag/js?id=G-0SX1LL4XNX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0SX1LL4XNX');
          `}
        </Script>

        {/* Sponsored Header */}
        <div 
          className="fixed top-0 left-0 right-0 z-50 text-center py-3 px-4 text-sm"
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            width: '100%',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          This is a sponsored page featuring participating wineries.
        </div>

        <Navigation />
        {children}
      </body>
    </html>
  )
}
