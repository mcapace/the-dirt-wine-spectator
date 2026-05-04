'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t py-10"
      style={{
        backgroundColor: '#faf6ee',
        borderColor: 'rgba(152,35,31,0.15)',
        color: '#1a1410',
      }}
    >
      <div className="container-minimal mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center md:text-left">
          <Image
            src="/images/ws-spectator-dark.png"
            alt="Wine Spectator"
            width={160}
            height={32}
            className="mx-auto mb-4 h-7 w-auto object-contain object-left md:mx-0"
          />
          <div className="font-serif text-xl text-ws-ink">The Dirt</div>
          <div className="font-serif mt-1 text-xs italic text-ws-ink/60">
            A Wine Spectator Series
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-ws-red/10 pt-8 md:flex-row md:items-start">
          <p className="font-mono text-center text-[10px] md:text-left" style={{ color: 'rgba(26,20,16,0.5)' }}>
            © {new Date().getFullYear()} Wine Spectator. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] md:justify-end">
            <Link href="https://www.winespectator.com/" className="hover:text-ws-red" style={{ color: 'rgba(26,20,16,0.5)' }}>
              WineSpectator.com
            </Link>
            <Link href="https://www.winespectator.com/policy/privacy-policy" className="hover:text-ws-red" style={{ color: 'rgba(26,20,16,0.5)' }}>
              Privacy Policy
            </Link>
            <Link href="https://www.winespectator.com/policy/terms-of-use" className="hover:text-ws-red" style={{ color: 'rgba(26,20,16,0.5)' }}>
              Terms of Use
            </Link>
          </div>
        </div>

        <p className="font-mono mt-8 text-center text-[9px] text-ws-ink/40 md:text-left">
          Sponsored Content
        </p>
      </div>
    </footer>
  );
}
