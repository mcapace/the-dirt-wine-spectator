'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  const handleVideosClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isMainPage) {
      // Scroll to video section on main page
      const videoSection = document.getElementById('about')
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // On individual pages, navigate to main page and scroll to video section
      window.location.href = '/#about'
    }
  }

  return (
    <div className="nav-minimal">
        <nav className="nav-content">
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
          
          <div className="nav-links">
            <Link href="#about" className="nav-link">
              About
            </Link>
            <a 
              href="#"
              className="nav-link"
              onClick={handleVideosClick}
            >
              Videos
            </a>
            <Link href="#wineries" className="nav-link">
              Wineries
            </Link>
          </div>
        </nav>
      </div>
  )
} 