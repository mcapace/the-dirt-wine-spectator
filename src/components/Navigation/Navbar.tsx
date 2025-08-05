'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav className="h-20 px-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/WS White.png"
            alt="Wine Spectator"
            width={180}
            height={45}
            className="h-12 w-auto"
            priority
          />
        </Link>
        
        <div className="flex items-center space-x-10">
          <Link href="#about" className="text-white text-lg font-medium hover:text-gold-300 transition-colors duration-300 tracking-wide">
            About
          </Link>
          <Link href="#videos" className="text-white text-lg font-medium hover:text-gold-300 transition-colors duration-300 tracking-wide">
            Videos
          </Link>
          <Link href="#wineries" className="text-white text-lg font-medium hover:text-gold-300 transition-colors duration-300 tracking-wide">
            Wineries
          </Link>
        </div>
      </nav>
    </div>
  )
} 