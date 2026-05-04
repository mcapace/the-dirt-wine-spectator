'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import JWPlayer from '@/components/JWPlayer';
import {
  getOrderedVideos,
  getThumbnailObjectPosition,
  jwThumbnailUrl,
  type TheDirtJwVideo,
} from '@/data/theDirtJwVideos';

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function EpisodeCarousel() {
  const allVideos = useMemo(() => getOrderedVideos(), []);
  const s2Videos = useMemo(
    () => allVideos.filter((v) => v.season === '02'),
    [allVideos],
  );
  const s1Videos = useMemo(
    () => allVideos.filter((v) => v.season === '01'),
    [allVideos],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeVideo = useMemo(
    () => (allVideos.length > 0 ? allVideos[activeIndex] : undefined),
    [allVideos, activeIndex],
  );

  useEffect(() => {
    const id = allVideos[activeIndex]?.id;
    if (!id) return;
    try {
      cardRefs.current[id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    } catch {
      /* ignore */
    }
  }, [activeIndex, allVideos]);

  function renderCard(video: TheDirtJwVideo) {
    const isActive = video.id === activeVideo?.id;
    const pos = getThumbnailObjectPosition(video.id);
    return (
      <motion.button
        key={video.id}
        type="button"
        ref={(el) => {
          cardRefs.current[video.id] = el;
        }}
        onClick={() => {
          const idx = allVideos.findIndex((v) => v.id === video.id);
          if (idx !== -1) setActiveIndex(idx);
        }}
        className={`relative block shrink-0 overflow-hidden rounded-md bg-neutral-900 transition-[filter] duration-500 ${
          isActive ? '' : 'brightness-[0.55] saturate-[0.7] hover:brightness-75 hover:saturate-90'
        }`}
        style={{
          width: isActive ? 240 : 180,
          aspectRatio: '9/16',
          scrollSnapAlign: 'start',
          animation: isActive
            ? 'ws-glow-pulse 2.4s ease-in-out infinite, ws-breathe 3.6s ease-in-out infinite'
            : undefined,
          transform: !isActive ? 'translateY(0)' : undefined,
        }}
        animate={!isActive ? { y: 0 } : undefined}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={!isActive ? { y: -4 } : undefined}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={jwThumbnailUrl(video.id)}
            alt={video.winery}
            className="h-full w-full object-cover"
            style={pos ? { objectPosition: pos } : undefined}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        <div className="absolute left-2.5 top-4">
          {isActive ? (
            <div className="flex items-center gap-1.5 rounded-full bg-ws-red px-2.5 py-1 font-mono text-[9px] text-ws-cream">
              <span
                className="h-1.5 w-1.5 rounded-full bg-ws-cream"
                style={{
                  animation: 'ws-pulse 1.6s ease-in-out infinite',
                }}
              />
              NOW PLAYING
            </div>
          ) : (
            <div className="rounded-full bg-ws-cream/95 px-2 py-0.5 font-mono text-[9px] font-medium text-ws-ink">
              S{video.season}
            </div>
          )}
        </div>

        {!isActive ? (
          <div className="absolute left-1/2 top-[38%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/40 backdrop-blur-md">
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '12px solid #faf6ee',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                marginLeft: '3px',
              }}
            />
          </div>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="font-mono text-[9px] text-ws-gold">{video.region?.toUpperCase()}</div>
          <div className="font-serif mt-0.5 text-sm leading-tight text-ws-cream">{video.winery}</div>
          <div className="font-mono mt-1 text-[9px] text-white/60">{formatDuration(video.duration)}</div>
        </div>
      </motion.button>
    );
  }

  return (
    <section id="about" className="bg-ws-cream py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-ws-red" />
              <span className="font-mono text-[10px] tracking-widest text-ws-red">
                — THE SERIES
              </span>
            </div>
            <h2 className="font-serif mt-2 text-4xl font-normal leading-none tracking-tight text-ws-ink md:text-5xl">
              Stories told <em className="italic text-ws-red">from the ground.</em>
            </h2>
          </div>
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-label="Previous story"
              disabled={activeIndex <= 0}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border text-lg leading-none text-ws-red disabled:opacity-40"
              style={{ borderColor: 'rgba(152,35,31,0.3)' }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next story"
              disabled={activeIndex >= allVideos.length - 1}
              onClick={() =>
                setActiveIndex((i) => Math.min(allVideos.length - 1, i + 1))
              }
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-ws-red text-lg leading-none text-[#faf6ee] shadow-[0_4px_12px_rgba(152,35,31,0.3)] disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>

        {activeVideo ? (
          <>
            <div
              className="relative mx-auto mb-6 max-w-5xl overflow-hidden rounded-lg bg-black"
              style={{ height: 'min(70vh, 600px)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${jwThumbnailUrl(activeVideo.id)})`,
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

              <div className="relative z-10 flex h-full min-h-0 w-full items-center justify-center px-2">
                {/* Fixed 9:16 frame via padding-bottom so JW iframe gets exact dimensions (avoids zoom/crop) */}
                <div
                  className="relative w-[min(100%,calc(min(70vh,600px)*9/16))] max-w-full overflow-hidden rounded-md bg-black ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full pb-[177.78%]">
                    <div className="absolute inset-0">
                      <JWPlayer
                        key={activeVideo.id}
                        mediaId={activeVideo.id}
                        wineryName={activeVideo.winery}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[5%] top-1/2 z-20 hidden max-w-[200px] -translate-y-1/2 lg:block">
                <div className="font-mono mb-2 text-[10px] text-ws-gold">
                  SEASON {activeVideo.season}
                </div>
                <div className="font-serif text-2xl leading-tight text-white">{activeVideo.winery}</div>
                <div className="font-mono mt-2 text-[10px] text-white/70">
                  {activeVideo.region?.toUpperCase()}
                </div>
                <div className="mt-3 text-xs leading-relaxed text-white/80">{activeVideo.description}</div>
              </div>

              {activeVideo.cta ? (
                <div className="absolute bottom-[8%] right-[5%] z-20 hidden lg:block">
                  <a
                    href={activeVideo.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm bg-ws-red px-4 py-2.5 font-mono text-[10px] tracking-widest text-ws-cream transition-colors hover:bg-ws-red-deep"
                  >
                    {activeVideo.cta.text.toUpperCase()} →
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mb-6 rounded-md bg-ws-cream-warm p-4 lg:hidden">
              <div className="font-mono mb-2 inline-block rounded-full bg-ws-red/10 px-2 py-0.5 text-[9px] text-ws-red">
                SEASON {activeVideo.season}
              </div>
              <div className="font-serif text-xl text-ws-ink">{activeVideo.winery}</div>
              <div className="font-mono mt-1 text-[10px] text-ws-ink/60">
                {activeVideo.region?.toUpperCase()}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ws-ink/80">{activeVideo.description}</p>
              {activeVideo.cta ? (
                <a
                  href={activeVideo.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono mt-4 flex w-full items-center justify-center rounded-sm bg-ws-red py-3 text-[10px] tracking-widest text-ws-cream"
                >
                  {activeVideo.cta.text.toUpperCase()}
                </a>
              ) : null}
            </div>
          </>
        ) : null}

        {/* Season 02 row */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="font-mono text-[11px] font-medium tracking-widest text-ws-red">SEASON 02</span>
            <span className="rounded-full bg-ws-red px-2 py-0.5 font-mono text-[9px] tracking-widest text-ws-cream">
              NEW
            </span>
            <div className="h-px flex-1 bg-ws-red/20" />
            <span className="font-mono text-[10px] tracking-wider text-ws-ink/50">
              {s2Videos.length} EPISODES
            </span>
          </div>
          <div
            className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {s2Videos.map((video) => renderCard(video))}
          </div>
        </div>

        {/* Season 01 row */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="font-mono text-[11px] font-medium tracking-widest text-ws-ink/70">
              SEASON 01
            </span>
            <div className="h-px flex-1 bg-ws-ink/15" />
            <span className="font-mono text-[10px] tracking-wider text-ws-ink/50">
              {s1Videos.length} EPISODES
            </span>
          </div>
          <div
            className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {s1Videos.map((video) => renderCard(video))}
          </div>
        </div>
      </div>
    </section>
  );
}
