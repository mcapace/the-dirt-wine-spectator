'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { getOrderedVideos } from '@/data/theDirtJwVideos';
import { openSubmitStoryMailto } from '@/lib/submitStoryMailto';

const HERO_VIDEO_SRC = '/hero/hero-background.mp4';

function smoothScrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const soilPatternId = useId().replace(/:/g, '');

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');

    const safePlay = () => {
      try {
        const p = el.play();
        if (p !== undefined) {
          void p.catch(() => {
            /* autoplay blocked, interrupted, or policy — ignore */
          });
        }
      } catch {
        /* sync throw from play() in legacy browsers */
      }
    };

    safePlay();

    return () => {
      el.pause();
    };
  }, []);

  const orderedWineries = getOrderedVideos().map((v) => v.winery);
  const marqueeDoubled = [...orderedWineries, ...orderedWineries];

  return (
    <section className="hero-minimal relative min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hero-bg-video absolute inset-0 z-0 h-full w-full min-h-full min-w-full object-cover"
        aria-hidden
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: 'rgba(26,20,16,0.4)',
          backdropFilter: 'blur(0.3px)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="relative z-20 flex w-full shrink-0 items-center justify-between border-b border-[rgba(250,246,238,0.12)] px-9 py-[22px]">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Image
              src="/images/ws-spectator-light.png"
              alt="Wine Spectator"
              width={140}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
            <span
              className="hidden shrink-0 sm:inline-block"
              style={{
                width: 1,
                height: 16,
                backgroundColor: 'rgba(26,20,16,0.2)',
              }}
            />
            <span
              className="font-mono hidden text-[rgba(250,246,238,0.5)] sm:inline"
              style={{ fontSize: 9, letterSpacing: '0.08em' }}
            >
              CUSTOM SERIES
            </span>
          </div>

          <nav className="hidden items-center gap-[28px] md:flex">
            <a
              href="#about"
              className="inline-block text-[12px] font-medium tracking-[0.04em] text-[#faf6ee]"
              aria-current="page"
            >
              <span className="block">Episodes</span>
              <span
                className="mt-1.5 block h-0.5 w-full bg-[#98231f]"
                style={{ marginTop: 6 }}
                aria-hidden
              />
            </a>
            <a
              href="#wineries"
              className="text-[12px] tracking-[0.04em] text-[#faf6ee] hover:opacity-90"
            >
              Wineries
            </a>
            <a
              href="#wineries"
              className="text-[12px] tracking-[0.04em] text-[#faf6ee] hover:opacity-90"
            >
              The Soil Atlas
            </a>
            <a
              href="#about"
              className="text-[12px] tracking-[0.04em] text-[#faf6ee] hover:opacity-90"
            >
              About
            </a>
            <button
              type="button"
              onClick={openSubmitStoryMailto}
              className="font-mono shrink-0 rounded-[2px] bg-[#98231f] px-[14px] py-[6px] text-[11px] tracking-widest text-[#faf6ee]"
            >
              SUBMIT YOUR STORY
            </button>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="h-0.5 w-6 bg-[#faf6ee]" />
            <span className="h-0.5 w-6 bg-[#faf6ee]" />
            <span className="h-0.5 w-6 bg-[#faf6ee]" />
          </button>
        </header>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-[60] flex flex-col bg-[rgba(26,20,16,0.97)] md:hidden">
            <div className="flex justify-end p-6">
              <button
                type="button"
                aria-label="Close menu"
                className="text-[#faf6ee]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-8">
              <a
                href="#about"
                className="text-lg tracking-[0.04em] text-[#faf6ee]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Episodes
              </a>
              <a
                href="#wineries"
                className="text-lg tracking-[0.04em] text-[#faf6ee]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wineries
              </a>
              <a
                href="#wineries"
                className="text-lg tracking-[0.04em] text-[#faf6ee]"
                onClick={() => setMobileMenuOpen(false)}
              >
                The Soil Atlas
              </a>
              <a
                href="#about"
                className="text-lg tracking-[0.04em] text-[#faf6ee]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </nav>
            <div className="p-8 pb-12">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSubmitStoryMailto();
                }}
                className="font-mono w-full rounded-[2px] bg-[#98231f] py-3 text-center text-[11px] tracking-widest text-[#faf6ee]"
              >
                SUBMIT YOUR STORY
              </button>
            </div>
          </div>
        ) : null}

        <div
          className="font-mono pointer-events-none absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 origin-left whitespace-nowrap text-[9px] text-[rgba(250,246,238,0.5)] md:block"
          style={{ transformOrigin: 'left center' }}
        >
          EST. 2024 · TWO SEASONS
        </div>
        <div
          className="font-mono pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 origin-right whitespace-nowrap text-[9px] text-[rgba(250,246,238,0.5)] md:block"
          style={{ transformOrigin: 'right center' }}
        >
          7 WINEMAKERS · 7 TERROIRS
        </div>

        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 pb-32 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex max-w-4xl flex-col items-center"
          >
            <div className="mb-[22px] flex items-center gap-3" style={{ marginBottom: 22 }}>
              <span className="h-px w-[60px] bg-[#98231f]" />
              <span className="font-mono text-[10px] text-ws-cream">
                A&nbsp;&nbsp;V&nbsp;&nbsp;I&nbsp;&nbsp;D&nbsp;&nbsp;E&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;E&nbsp;&nbsp;R&nbsp;&nbsp;I&nbsp;&nbsp;E&nbsp;&nbsp;S
              </span>
              <span className="h-px w-[60px] bg-[#98231f]" />
            </div>

            <h1
              className="font-serif text-center text-[clamp(64px,11vw,140px)] md:text-[clamp(72px,11vw,140px)]"
              style={{
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: '#faf6ee',
              }}
            >
              <em style={{ color: '#98231f', fontStyle: 'italic' }}>The</em> Dirt
            </h1>

            <p
              className="font-serif mt-[18px] max-w-[540px] text-center italic leading-[1.3] text-[#c9a96a]"
              style={{ fontSize: 22, marginTop: 18 }}
            >
              Where great wine begins, beneath the soil.
            </p>

            <p
              className="font-sans mt-[14px] max-w-[520px] text-center leading-[1.7] text-[rgba(250,246,238,0.7)]"
              style={{ fontSize: 14, fontWeight: 300, marginTop: 14 }}
            >
              Seven winemakers. Two seasons. Told from the ground up by the people who farm it.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-[10px]" style={{ marginTop: 28 }}>
              <button
                type="button"
                onClick={() => smoothScrollToId('about')}
                className="font-mono flex items-center rounded-[2px] bg-[#98231f] px-[26px] py-[14px] text-[12px] tracking-widest text-[#faf6ee]"
                style={{
                  boxShadow: '0 6px 20px rgba(152,35,31,0.35)',
                }}
              >
                <span
                  className="mr-2 inline-block h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-[#faf6ee]"
                  aria-hidden
                />
                WATCH THE SERIES
              </button>
              <button
                type="button"
                onClick={() => smoothScrollToId('wineries')}
                className="font-mono rounded-[2px] border border-[rgba(250,246,238,0.3)] px-[26px] py-[14px] text-[12px] tracking-widest text-[#faf6ee]"
              >
                MEET THE WINERIES
              </button>
            </div>
          </motion.div>
        </div>

        <div
          className="font-serif absolute bottom-[110px] left-0 right-0 z-10 hidden overflow-hidden border-y border-[rgba(250,246,238,0.12)] py-[14px] md:block"
          style={{
            background: 'rgba(250,246,238,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="marquee-track flex w-max items-center gap-[56px]"
            style={{
              animation: 'ws-marquee 40s linear infinite',
            }}
          >
            {marqueeDoubled.flatMap((name, i) => {
              const chunk = [
                <span
                  key={`n-${i}`}
                  className="text-[18px] whitespace-nowrap text-[#faf6ee]"
                  style={{ fontStyle: i % 2 === 1 ? 'italic' : 'normal' }}
                >
                  {name}
                </span>,
              ];
              if (i < marqueeDoubled.length - 1) {
                chunk.push(
                  <span key={`b-${i}`} className="text-[10px] text-[#98231f]">
                    ●
                  </span>,
                );
              }
              return chunk;
            })}
          </div>
        </div>

        <svg
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] w-full"
          style={{ height: 90 }}
          viewBox="0 0 800 90"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id={`${soilPatternId}-dots`}
              x="0"
              y="0"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="3" r="0.6" fill="#3a2418" opacity="0.5" />
            </pattern>
            <pattern
              id={`${soilPatternId}-dots-fine`}
              x="0"
              y="0"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="0.4" fill="#3a2418" opacity="0.6" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="800" height="22" fill="#d4a87a" />
          <rect x="0" y="0" width="800" height="22" fill={`url(#${soilPatternId}-dots)`} />
          <rect x="0" y="22" width="800" height="28" fill="#a8754a" />
          <rect x="0" y="22" width="800" height="28" fill={`url(#${soilPatternId}-dots-fine)`} />
          <rect x="0" y="50" width="800" height="40" fill="#6b4226" />
          <rect x="0" y="50" width="800" height="40" fill={`url(#${soilPatternId}-dots-fine)`} />
          <path
            d="M 120 0 Q 122 30 115 60 T 108 90"
            stroke="#3a2418"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 115 60 Q 100 65 90 80"
            stroke="#3a2418"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 280 0 Q 285 25 282 55 T 278 90"
            stroke="#3a2418"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 282 55 Q 295 60 305 75"
            stroke="#3a2418"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 480 0 Q 478 28 482 58 T 485 90"
            stroke="#3a2418"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 482 58 Q 470 65 462 82"
            stroke="#3a2418"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 660 0 Q 663 32 658 62 T 654 90"
            stroke="#3a2418"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 658 62 Q 672 68 680 84"
            stroke="#3a2418"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div style={{ y }}>
          <motion.div
            className="h-4 w-px bg-white/60"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
