'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SUBJECT = 'The Dirt - Winery Story Submission';
const SUBMIT_BODY = `Hi John,

I'm interested in sharing my winery's story for The Dirt video series.

Winery Name:
Location:
Contact Information:

I'd love to discuss how we can showcase our unique terroir and winemaking story through your vertical video format.

Best regards,
[Your Name]`;

function openSubmitMailto() {
  window.open(
    `mailto:ebain@mshanken.com?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(SUBMIT_BODY)}`,
    '_blank',
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/';
  const isLanding =
    pathname !== '/' &&
    pathname !== '' &&
    [
      '/sullivan',
      '/hall',
      '/whitehaven',
      '/j-vineyards',
      '/trefethen',
      '/rocky-pond',
      '/robert-hall',
    ].includes(pathname);

  const scrollOrNavigate = (hash: string) => {
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${hash}`;
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="fixed left-0 right-0 top-12 z-[45] border-b backdrop-blur-[12px]"
        style={{
          backgroundColor: 'rgba(250,246,238,0.92)',
          borderColor: 'rgba(152,35,31,0.15)',
          padding: '16px 36px',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
            {isLanding ? (
              <Link
                href="/"
                className="font-mono shrink-0 text-[9px] text-ws-red hover:underline"
              >
                ← BACK
              </Link>
            ) : null}
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="font-serif shrink-0 text-sm font-medium text-ws-red md:text-[14px]">
                Wine Spectator
              </span>
              <span
                className="hidden h-3.5 w-px shrink-0 bg-ws-ink/20 sm:block"
                style={{ height: 14 }}
              />
              <span className="font-mono hidden text-[9px] text-ws-ink/60 sm:inline">
                THE DIRT
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-7 md:flex" style={{ gap: 28 }}>
            <button
              type="button"
              onClick={() => scrollOrNavigate('about')}
              className="font-sans text-xs text-ws-ink hover:text-ws-red"
            >
              Episodes
            </button>
            <button
              type="button"
              onClick={() => scrollOrNavigate('wineries')}
              className="font-sans text-xs text-ws-ink hover:text-ws-red"
            >
              Wineries
            </button>
            <button
              type="button"
              onClick={() => scrollOrNavigate('about')}
              className="font-sans text-xs text-ws-ink hover:text-ws-red"
            >
              About
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                openSubmitMailto();
                setMobileOpen(false);
              }}
              className="font-mono hidden rounded-[2px] bg-[#98231f] px-[14px] py-[6px] text-[11px] text-[#faf6ee] md:inline-block"
            >
              SUBMIT YOUR STORY
            </button>

            <button
              type="button"
              aria-label="Open menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-6 bg-ws-ink" />
              <span className="h-0.5 w-6 bg-ws-ink" />
              <span className="h-0.5 w-6 bg-ws-ink" />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[rgba(250,246,238,0.98)] backdrop-blur-md md:hidden">
          <div className="flex justify-end p-6">
            <button
              type="button"
              aria-label="Close menu"
              className="text-2xl text-ws-ink"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-8">
            <button
              type="button"
              className="font-sans text-lg text-ws-ink"
              onClick={() => scrollOrNavigate('about')}
            >
              Episodes
            </button>
            <button
              type="button"
              className="font-sans text-lg text-ws-ink"
              onClick={() => scrollOrNavigate('wineries')}
            >
              Wineries
            </button>
            <button
              type="button"
              className="font-sans text-lg text-ws-ink"
              onClick={() => scrollOrNavigate('about')}
            >
              About
            </button>
          </nav>
          <div className="p-8 pb-12">
            <button
              type="button"
              onClick={() => {
                openSubmitMailto();
                setMobileOpen(false);
              }}
              className="font-mono w-full rounded-[2px] bg-[#98231f] py-3 text-[11px] tracking-wide text-[#faf6ee]"
            >
              SUBMIT YOUR STORY
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
