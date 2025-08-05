'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 h-12 px-6 flex items-center"
      style={{ backgroundColor: '#98231f' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/WS White.png"
            alt="Wine Spectator"
            width={120}
            height={30}
            className="h-6 w-auto"
            priority
          />
        </Link>
      </div>
    </nav>
  )
} 