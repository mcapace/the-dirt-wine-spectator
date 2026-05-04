'use client';

import { useEffect, useRef } from 'react';
import { JW_PLAYER_ID, jwPlaylistUrl } from '@/data/theDirtJwVideos';

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

type JWPlayerInstance = {
  remove: () => void;
  on: (event: string, handler: (e: unknown) => void) => void;
};

type JWSetup = (options: Record<string, unknown>) => JWPlayerInstance;

let jwLibraryPromise: Promise<void> | null = null;

function ensureJwLibrary(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  const g = window as unknown as { jwplayer?: (target: Element | string) => { setup: JWSetup } };
  if (typeof g.jwplayer === 'function') return Promise.resolve();
  if (!jwLibraryPromise) {
    jwLibraryPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `https://cdn.jwplayer.com/libraries/${JW_PLAYER_ID}.js`;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('JW Player library failed to load'));
      document.head.appendChild(s);
    });
  }
  return jwLibraryPromise;
}

export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<JWPlayerInstance | null>(null);
  const onTimeRef = useRef(onTime);
  const onCompleteRef = useRef(onComplete);
  onTimeRef.current = onTime;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    ensureJwLibrary()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        playerRef.current?.remove();
        playerRef.current = null;

        const g = window as unknown as { jwplayer?: (target: Element | string) => { setup: JWSetup } };
        const jw = g.jwplayer;
        if (!jw || typeof jw !== 'function') return;

        const player = jw(containerRef.current).setup({
          playlist: jwPlaylistUrl(mediaId),
          width: '100%',
          aspectratio: '9:16',
          stretching: 'uniform',
          responsive: true,
        });

        playerRef.current = player;

        if (onTimeRef.current) {
          player.on('time', (e) => {
            const ev = e as { position?: number; duration?: number };
            const cb = onTimeRef.current;
            if (
              cb &&
              typeof ev?.position === 'number' &&
              typeof ev?.duration === 'number'
            ) {
              cb(ev.position, ev.duration);
            }
          });
        }
        if (onCompleteRef.current) {
          player.on('complete', () => onCompleteRef.current?.());
        }
      })
      .catch(() => {
        /* leave black box; optional: surface error UI later */
      });

    return () => {
      cancelled = true;
      playerRef.current?.remove();
      playerRef.current = null;
    };
  }, [mediaId]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black"
      aria-label={wineryName ? `${wineryName} — The Dirt video` : 'The Dirt video player'}
    >
      <div ref={containerRef} className="absolute inset-0 h-full min-h-0 w-full min-w-0" />
    </div>
  );
}
