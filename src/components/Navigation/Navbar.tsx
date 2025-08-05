'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: '#98231f' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/WS White.png"
            alt="Wine Spectator"
            width={180}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>
    </nav>
  )
} 