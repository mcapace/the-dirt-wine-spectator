'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';
import { wineries } from '@/data/wineries';

const FEATURED_MEDIA_ID = 'nsF12zfB';

/** Robert Hall is featured; rail shows the other six wineries (no duplicates). */
export default function WineryBento() {
  const featured = wineries.find((w) => w.mediaId === FEATURED_MEDIA_ID)!;
  const featuredMeta = getVideoByMediaId(featured.mediaId)!;
  const nonFeatured = wineries.filter((w) => w.mediaId !== FEATURED_MEDIA_ID);
  // Order: Rocky Pond, Sullivan, Trefethen, HALL | J Vineyards, Whitehaven
  const firstFour = nonFeatured.slice(0, 4);
  const lastTwo = nonFeatured.slice(4, 6);

  return (
    <section id="wineries" className="relative bg-ws-cream py-12 md:py-16">
      <svg
        className="pointer-events-none absolute left-0 right-0 top-0 w-full"
        style={{ height: 18 }}
        viewBox="0 0 800 18"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 18 Q 100 4, 200 12 T 400 8 T 600 14 T 800 6 L 800 0 L 0 0 Z"
          fill="#5a3a26"
          opacity="0.08"
        />
        <path
          d="M 0 18 Q 100 8, 200 16 T 400 12 T 600 18 T 800 10 L 800 18 Z"
          fill="#5a3a26"
          opacity="0.04"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-7 bg-ws-red" />
            <span className="font-mono text-[10px] text-ws-red">FEATURED&nbsp;&nbsp;WINERIES</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ws-ink md:text-5xl">
              Seven wineries. <em className="italic text-ws-red">One season.</em>
            </h2>
            <p className="hidden max-w-[280px] text-right text-sm leading-relaxed text-ws-ink/60 md:block">
              From Columbia Valley to the Marlborough Sound, every bottle a story of place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div
            className="group relative overflow-hidden rounded-lg border border-ws-red/20 bg-white md:col-span-2 md:row-span-2"
            style={{
              minHeight: 290,
              boxShadow: '0 8px 24px rgba(152,35,31,0.08)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(152,35,31,0.2)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Link
              href={featured.landingPath}
              className="absolute inset-0 z-10"
              aria-label={`${featured.name} — watch story`}
            />
            <div className="absolute bottom-0 right-0 top-0 overflow-hidden" style={{ width: 80 }}>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, #d4a87a 0%, #a8754a 40%, #6b4226 80%, #3a2418 100%)',
                  opacity: 0.85,
                }}
              />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 80 290"
                preserveAspectRatio="none"
              >
                <path
                  d="M 40 0 Q 38 50 42 100 T 38 200 T 42 290"
                  stroke="#1a0f08"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M 42 100 Q 55 110 65 130"
                  stroke="#1a0f08"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M 38 200 Q 25 215 18 240"
                  stroke="#1a0f08"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>

            <div className="pointer-events-none relative z-0 flex h-full flex-col justify-between p-6 pr-24">
              <div>
                <div className="font-mono mb-3.5 flex items-center gap-2 text-[9px]">
                  <span className="text-ws-red">
                    FEATURED · EP {featuredMeta.episodeNumber}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-ws-red" />
                  <span className="text-ws-ink/50">{featuredMeta.region?.toUpperCase()}</span>
                </div>

                <div className="mb-3.5 flex h-16 items-center">
                  <Image
                    src={featured.logo}
                    alt={`${featured.name} logo`}
                    width={200}
                    height={64}
                    className="max-h-16 w-auto object-contain object-left"
                    priority
                  />
                </div>

                <p className="max-w-[320px] text-sm leading-relaxed text-ws-ink/70">
                  {featuredMeta.description}
                </p>
              </div>

              <div>
                <div className="mb-4 flex gap-6 border-t border-ws-ink/10 pt-3.5">
                  <div>
                    <div className="font-mono text-[9px] text-ws-ink/50">REGION</div>
                    <div className="mt-0.5 text-xs font-medium text-ws-ink">{featuredMeta.region}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-ws-ink/50">SOIL</div>
                    <div className="mt-0.5 text-xs font-medium text-ws-ink">{featuredMeta.soilType}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-ws-ink/50">FOUNDED</div>
                    <div className="mt-0.5 text-xs font-medium text-ws-ink">{featuredMeta.founded}</div>
                  </div>
                </div>
                <div className="relative z-20 flex gap-2">
                  <span className="pointer-events-none inline-block rounded-sm bg-ws-red px-4 py-2.5 font-mono text-[10px] text-ws-cream">
                    WATCH STORY →
                  </span>
                  <a
                    href={featured.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto rounded-sm border border-ws-ink/25 px-4 py-2.5 font-mono text-[10px] text-ws-ink transition-colors hover:bg-ws-ink/5"
                  >
                    VISIT WINERY
                  </a>
                </div>
              </div>
            </div>
          </div>

          {firstFour.map((winery) => {
            const meta = getVideoByMediaId(winery.mediaId);
            if (!meta) return null;
            return (
              <Link
                key={winery.id}
                href={winery.landingPath}
                className="flex min-h-[134px] flex-col justify-between rounded-lg border border-ws-ink/8 bg-white p-4 text-ws-ink no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-ws-red/30"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(26,20,16,0.08)',
                }}
              >
                <div className="font-mono text-[9px] text-ws-red">EP {meta.episodeNumber}</div>
                <div>
                  <div className="mb-2 flex h-7 items-center">
                    <Image
                      src={winery.logo}
                      alt={winery.name}
                      width={120}
                      height={28}
                      className="max-h-7 w-auto object-contain object-left"
                    />
                  </div>
                  <div className="font-serif text-base leading-tight text-ws-ink">{winery.name}</div>
                  <div className="font-mono mt-1 text-[9px] text-ws-ink/50">
                    {meta.region?.toUpperCase()}
                  </div>
                </div>
              </Link>
            );
          })}

          {lastTwo.map((winery) => {
            const meta = getVideoByMediaId(winery.mediaId);
            if (!meta) return null;
            return (
              <Link
                key={winery.id}
                href={winery.landingPath}
                className="flex min-h-[134px] items-center justify-between rounded-lg border border-ws-ink/8 bg-white p-4 text-ws-ink no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-ws-red/30 md:col-span-2"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(26,20,16,0.08)',
                }}
              >
                <div>
                  <div className="font-mono text-[9px] text-ws-red">EP {meta.episodeNumber}</div>
                  <div className="mt-2 flex h-8 items-center">
                    <Image
                      src={winery.logo}
                      alt={winery.name}
                      width={140}
                      height={32}
                      className="max-h-8 w-auto object-contain object-left"
                    />
                  </div>
                  <div className="font-serif mt-2 text-base leading-tight text-ws-ink">{winery.name}</div>
                  <div className="font-mono mt-1 text-[9px] text-ws-ink/50">
                    {meta.region?.toUpperCase()}
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-1 w-1 rounded-full bg-ws-red" />
                  <div className="h-1 w-1 rounded-full bg-ws-ink/20" />
                  <div className="h-1 w-1 rounded-full bg-ws-ink/20" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
