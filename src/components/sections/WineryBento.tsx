'use client';

import Image from 'next/image';
import Link from 'next/link';
import { wineries } from '@/data/wineries';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';
import SoilSwatch from '@/components/SoilSwatch';

export default function WineryBento() {
  return (
    <section id="wineries" className="relative bg-ws-cream py-16 md:py-20">
      <svg
        className="pointer-events-none absolute left-0 right-0 top-0 w-full"
        style={{ height: '18px' }}
        viewBox="0 0 800 18"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 18 Q 100 4, 200 12 T 400 8 T 600 14 T 800 6 L 800 0 L 0 0 Z"
          fill="#5a3a26"
          opacity="0.08"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-7 bg-ws-red" />
            <span className="font-mono text-[10px] tracking-widest text-ws-red">THE TERROIR ATLAS</span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ws-ink md:text-5xl">
              Seven soils. <em className="italic text-ws-red">Seven stories.</em>
            </h2>
            <p className="max-w-[320px] text-sm leading-relaxed text-ws-ink/60">
              Every great wine begins with the ground beneath the vines. Click any winery to watch the story.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wineries.map((winery) => {
            const meta = getVideoByMediaId(winery.mediaId);
            if (!meta) return null;

            return (
              <Link
                key={winery.id}
                href={winery.landingPath}
                className="group flex min-h-[180px] overflow-hidden rounded-lg border border-ws-ink/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ws-red/30"
              >
                <SoilSwatch mediaId={winery.mediaId} className="w-9 shrink-0" />

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-widest text-ws-red">
                        EP {meta.episodeNumber}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-ws-red/40" />
                      <span className="font-mono text-[10px] tracking-wider text-ws-ink/50">
                        {meta.region?.toUpperCase()}
                      </span>
                    </div>

                    <div className="mb-3 flex h-8 items-center">
                      <Image
                        src={winery.logo}
                        alt={`${winery.name} logo`}
                        width={140}
                        height={32}
                        className="max-h-8 w-auto object-contain object-left"
                      />
                    </div>

                    <div className="font-serif text-lg leading-tight text-ws-ink">{winery.name}</div>

                    <div className="mt-2 text-xs leading-relaxed text-ws-ink/65">
                      <span className="font-medium text-ws-ink/85">{meta.soilType}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-ws-ink/10 pt-3">
                    <span className="font-mono text-[10px] tracking-wider text-ws-ink/50">
                      EST. {meta.founded}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-ws-red transition-transform group-hover:translate-x-0.5">
                      WATCH →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ws-ink/10 pt-6 md:flex-row md:items-center">
          <p className="max-w-[480px] text-xs italic leading-relaxed text-ws-ink/50">
            Soil compositions are visualized as approximations of each region&apos;s primary horizons. Click
            any winery to learn how their terroir shapes the bottle.
          </p>
          <Link
            href="#submit"
            className="font-mono text-[10px] tracking-widest text-ws-red hover:text-ws-red-deep"
          >
            HAVE A STORY TO TELL? →
          </Link>
        </div>
      </div>
    </section>
  );
}
