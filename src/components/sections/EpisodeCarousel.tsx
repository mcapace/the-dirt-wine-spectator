'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import JWPlayer from '@/components/JWPlayer';
import {
  CAROUSEL_PIN_FIRST,
  getThumbnailObjectPosition,
  jwThumbnailUrl,
  theDirtJwVideos,
  type TheDirtJwVideo,
} from '@/data/theDirtJwVideos';

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function EpisodeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videos, setVideos] = useState<TheDirtJwVideo[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const list = [...theDirtJwVideos];
    const first = list.find((v) => v.id === CAROUSEL_PIN_FIRST) ?? list[0];
    const second = list.find((v) => v.episodeNumber === '02') ?? list[1];
    const rest = list.filter((v) => v.id !== first.id && v.id !== second.id);
    const shuffledRest = [...rest].sort(() => Math.random() - 0.5);
    setVideos([first, second, ...shuffledRest]);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    try {
      cardRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    } catch {
      /* ignore scroll edge cases */
    }
  }, [activeIndex, videos.length]);

  const activeVideo = useMemo(
    () => (videos.length > 0 ? videos[activeIndex] : undefined),
    [videos, activeIndex],
  );

  const indexLabel = String(activeIndex + 1).padStart(2, '0');

  return (
    <section id="about" className="bg-ws-cream py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-ws-red" />
              <span className="font-mono text-[10px] text-ws-red">
                EPISODES&nbsp;&nbsp;01–07
              </span>
            </div>
            <h2 className="font-serif mt-2 text-4xl font-normal leading-none tracking-tight text-ws-ink md:text-5xl">
              Stories told <em className="italic text-ws-red">from the ground.</em>
            </h2>
          </div>
          <div className="mb-0.5 hidden items-center gap-2 md:flex">
            <span
              className="font-mono text-[10px]"
              style={{ color: '#6b5d4a', marginRight: 6 }}
            >
              {indexLabel} / 07
            </span>
            <button
              type="button"
              aria-label="Previous episode"
              disabled={activeIndex <= 0}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border text-lg leading-none text-ws-red disabled:opacity-40"
              style={{ borderColor: 'rgba(152,35,31,0.3)' }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next episode"
              disabled={activeIndex >= videos.length - 1}
              onClick={() =>
                setActiveIndex((i) => Math.min(videos.length - 1, i + 1))
              }
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-ws-red text-lg leading-none text-[#faf6ee] shadow-[0_4px_12px_rgba(152,35,31,0.3)] disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>

        {activeVideo ? (
          <>
            {/* Player block */}
            <div
              className="relative w-full mx-auto max-w-5xl rounded-lg overflow-hidden mb-6 bg-black"
              style={{ height: 'min(70vh, 600px)' }}
            >
              {/* Blurred backdrop */}
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

              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
                }}
              />

              {/* Vertical 9:16 player, sized by height */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div
                  className="relative h-full min-h-0 overflow-hidden rounded-md bg-black ring-1 ring-white/10"
                  style={{
                    aspectRatio: '9 / 16',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  <JWPlayer mediaId={activeVideo.id} />
                </div>
              </div>

              {/* Left metadata panel — positioned in empty space */}
              <div
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 z-20"
                style={{ left: '5%', maxWidth: '200px' }}
              >
                <div className="font-mono text-[10px] text-ws-gold mb-2">
                  EP {activeVideo.episodeNumber}
                </div>
                <div className="font-serif text-2xl text-white leading-tight">{activeVideo.winery}</div>
                <div className="font-mono text-[10px] text-white/70 mt-2">{activeVideo.region?.toUpperCase()}</div>
                <div className="text-xs text-white/80 mt-3 leading-relaxed">{activeVideo.description}</div>
              </div>

              {/* Right CTA panel */}
              {activeVideo.cta && (
                <div
                  className="absolute z-20 hidden lg:block"
                  style={{ right: '5%', bottom: '8%' }}
                >
                  <a
                    href={activeVideo.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-ws-red text-ws-cream px-4 py-2.5 rounded-sm font-mono text-[10px] tracking-widest hover:bg-ws-red-deep transition-colors"
                  >
                    {activeVideo.cta.text.toUpperCase()} →
                  </a>
                </div>
              )}
            </div>

            {/* Mobile metadata (below lg only — desktop copy lives inside player block) */}
            <div className="mb-6 rounded-md bg-ws-cream-warm p-4 lg:hidden">
              <div className="font-mono mb-2 inline-block rounded-full bg-ws-red/10 px-2 py-0.5 text-[9px] text-ws-red">
                EP {activeVideo.episodeNumber}
              </div>
              <div className="font-serif text-xl text-ws-ink">{activeVideo.winery}</div>
              <div className="font-mono mt-1 text-[10px] text-ws-ink/60">
                {activeVideo.region?.toUpperCase()}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ws-ink/80">
                {activeVideo.description}
              </p>
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

        {/* Rail */}
        <div
          className="-mx-6 overflow-x-auto pb-5 px-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-4">
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              const pos = getThumbnailObjectPosition(video.id);
              return (
                <motion.button
                  key={video.id}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => setActiveIndex(index)}
                  className="relative block shrink-0 overflow-hidden rounded-md bg-neutral-900"
                  style={{
                    width: isActive ? 290 : 200,
                    aspectRatio: '9/16',
                    scrollSnapAlign: 'center',
                  }}
                  animate={{ y: isActive ? -14 : 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  whileHover={{ y: isActive ? -14 : -6 }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={jwThumbnailUrl(video.id)}
                      alt={video.winery}
                      className="h-full w-full object-cover"
                      style={
                        pos
                          ? { objectPosition: pos }
                          : undefined
                      }
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />

                  <div className="absolute left-2.5 top-2.5">
                    {isActive ? (
                      <div className="font-mono flex items-center gap-1.5 rounded-full bg-ws-red px-2.5 py-1 text-[9px] text-ws-cream">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-ws-cream"
                          style={{
                            animation: 'ws-pulse 1.6s ease-in-out infinite',
                          }}
                        />
                        NOW PLAYING
                      </div>
                    ) : (
                      <div className="font-mono rounded-full bg-ws-cream/95 px-2 py-0.5 text-[9px] font-medium text-ws-ink">
                        EP {video.episodeNumber}
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
                    <div className="font-mono text-[9px] text-ws-gold">
                      {video.region?.toUpperCase()}
                    </div>
                    <div className="font-serif mt-0.5 text-sm leading-tight text-ws-cream">
                      {video.winery}
                    </div>
                    <div className="font-mono mt-1 text-[9px] text-white/60">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  {isActive ? (
                    <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-ws-red/40" />
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        {videos.length > 0 ? (
          <div className="mt-8 flex items-center gap-2">
            <span className="font-mono w-6 text-[9px] text-ws-red">01</span>
            <div className="relative h-[3px] flex-1 rounded-sm bg-ws-red/15">
              <div
                className="absolute left-0 top-0 h-full rounded-sm bg-ws-red transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / videos.length) * 100}%`,
                }}
              />
              {videos.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px"
                  style={{
                    left: `${((i + 1) / videos.length) * 100}%`,
                    top: '-3px',
                    height: '9px',
                    transform: 'translateX(-50%)',
                    background:
                      i <= activeIndex
                        ? '#98231f'
                        : 'rgba(152,35,31,0.25)',
                  }}
                />
              ))}
            </div>
            <span className="font-mono w-6 text-right text-[9px] text-ws-ink/40">
              07
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
