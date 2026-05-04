'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import JWPlayer from '@/components/JWPlayer';
import {
  getThumbnailObjectPosition,
  getVideoByMediaId,
  jwThumbnailUrl,
  theDirtJwVideos,
} from '@/data/theDirtJwVideos';
import { wineries } from '@/data/wineries';

function landingHrefForMediaId(mediaId: string): string {
  return wineries.find((w) => w.mediaId === mediaId)?.landingPath ?? `/videos/${mediaId}`;
}

function nextEpisodes(currentMediaId: string) {
  const ordered = [...theDirtJwVideos].sort(
    (a, b) => Number(a.episodeNumber ?? 0) - Number(b.episodeNumber ?? 0),
  );
  const idx = ordered.findIndex((v) => v.id === currentMediaId);
  if (idx === -1) return [];
  return [ordered[(idx + 1) % ordered.length], ordered[(idx + 2) % ordered.length]];
}

export type WineryLandingProps = {
  mediaId: string;
  title: ReactNode;
  heroDescription: string;
};

export default function WineryLanding({ mediaId, title, heroDescription }: WineryLandingProps) {
  const meta = getVideoByMediaId(mediaId);
  const wineryRow = wineries.find((w) => w.mediaId === mediaId);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    setShowCTA(false);
  }, [mediaId]);

  const handleJWTime = useCallback(
    (currentTime: number, duration: number) => {
      if (!meta?.cta || duration <= 0) return;
      if (currentTime >= duration - 15) setShowCTA(true);
    },
    [meta?.cta],
  );

  const handleJWComplete = useCallback(() => {
    if (meta?.cta) setShowCTA(true);
  }, [meta?.cta]);

  if (!meta || !wineryRow) return null;

  const upNext = nextEpisodes(mediaId);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ws-cream">
      <main className="pb-16 pt-24">
        {/* Hero */}
        <section className="relative px-4 pb-10 pt-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-4xl">
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <span className="font-mono text-[10px] text-ws-red">EP {meta.episodeNumber}</span>
              <span className="hidden h-px w-7 bg-ws-red sm:block" />
              <span className="font-mono text-[10px] text-ws-ink/60">
                {meta.region?.toUpperCase()}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1
                className="font-serif mx-auto font-normal leading-[1.05] text-ws-ink"
                style={{
                  fontSize: 'clamp(48px, 6vw, 80px)',
                }}
              >
                {title}
              </h1>
              <p
                className="font-sans mx-auto mt-6 max-w-[600px] leading-relaxed text-ws-ink/70"
                style={{ fontSize: 16, fontWeight: 300 }}
              >
                {heroDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Player */}
        <section className="mb-10 px-4 sm:px-6 lg:px-8">
          <div
            className="relative mx-auto mb-6 w-full max-w-5xl overflow-hidden rounded-lg bg-black"
            style={{ height: 'min(70vh, 600px)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${jwThumbnailUrl(mediaId)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(60px) brightness(0.55) saturate(1.3)',
                transform: 'scale(1.3)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full items-center justify-center">
              <div
                className="relative h-full min-h-0 overflow-hidden rounded-md bg-black ring-1 ring-white/10"
                style={{
                  aspectRatio: '9 / 16',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <JWPlayer
                  key={mediaId}
                  mediaId={mediaId}
                  onTime={handleJWTime}
                  onComplete={handleJWComplete}
                />
                {showCTA && meta.cta ? (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="pointer-events-none absolute bottom-10 left-0 right-0 z-10 flex justify-center px-4"
                  >
                    <a
                      href={meta.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto font-mono rounded-[2px] bg-ws-red px-6 py-3 text-[11px] uppercase tracking-widest text-ws-cream shadow-lg transition-colors hover:bg-ws-red-deep"
                    >
                      {meta.cta.text}
                    </a>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Metadata strip */}
        <section className="mx-auto mb-16 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-lg border border-ws-ink/10 bg-white p-6 md:grid-cols-3">
            <div>
              <div className="font-mono text-[9px] text-ws-ink/50">REGION</div>
              <div className="mt-1 text-sm font-medium text-ws-ink">{meta.region}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-ws-ink/50">SOIL</div>
              <div className="mt-1 text-sm font-medium text-ws-ink">{meta.soilType}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-ws-ink/50">FOUNDED</div>
              <div className="mt-1 text-sm font-medium text-ws-ink">{meta.founded}</div>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="mx-auto mb-16 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif mb-8 text-center text-xl text-ws-ink md:text-2xl">
            Connect with {wineryRow.name}
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href={wineryRow.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ws-ink/10 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <img src="/Logos/Web logo.png" alt="Website" className="h-7 w-7" />
            </a>
            <a
              href={wineryRow.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ws-ink/10 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <img src="/Logos/IG logo.png" alt="Instagram" className="h-7 w-7" />
            </a>
            <a
              href={wineryRow.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ws-ink/10 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <img src="/Logos/FB logo.png" alt="Facebook" className="h-7 w-7" />
            </a>
          </div>
        </section>

        {/* Up next */}
        <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
          <h3 className="font-serif mb-6 text-2xl text-ws-ink">Up next</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upNext.map((v) => {
              const href = landingHrefForMediaId(v.id);
              const thumbPos = getThumbnailObjectPosition(v.id);
              return (
                <Link
                  key={v.id}
                  href={href}
                  className="flex min-h-[134px] flex-col justify-between rounded-lg border border-black/[0.08] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ws-red/30"
                >
                  <div className="font-mono text-[9px] text-ws-red">EP {v.episodeNumber}</div>
                  <div className="flex flex-1 gap-4">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={jwThumbnailUrl(v.id)}
                        alt={v.winery}
                        className="h-full w-full object-cover"
                        style={thumbPos ? { objectPosition: thumbPos } : undefined}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-base leading-tight text-ws-ink">{v.winery}</div>
                      <div className="font-mono mt-1 text-[9px] text-ws-ink/50">
                        {v.region?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
