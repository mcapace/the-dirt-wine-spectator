'use client';

import { useEffect, useRef, useState } from 'react';
import { jwEmbedUrl } from '@/data/theDirtJwVideos';

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  // Wait until the container has measurable dimensions before mounting the iframe.
  // This prevents JW Player from booting against a zero-sized or transitioning container,
  // which is the root cause of random zoomed/letterboxed renders.
  useEffect(() => {
    if (!containerRef.current) return;

    const checkReady = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setReady(true);
        return true;
      }
      return false;
    };

    if (checkReady()) return;

    // Use ResizeObserver to detect when the container is sized
    const observer = new ResizeObserver(() => {
      if (checkReady()) {
        observer.disconnect();
      }
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Force the iframe to recalculate its dimensions after load.
  // Some JW Player builds need a window resize event to re-measure.
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 250);
    return () => clearTimeout(timer);
  }, [ready, mediaId]);

  // Listen for postMessage events from the iframe for time/complete callbacks
  useEffect(() => {
    if (!onTime && !onComplete) return;

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.origin === 'string' && !event.origin.includes('jwplayer.com')) return;
      if (typeof event.data !== 'object' || !event.data) return;

      const { type, position, duration } = event.data as {
        type?: string;
        position?: number;
        duration?: number;
      };
      if (type === 'time' && onTime && typeof position === 'number' && typeof duration === 'number') {
        onTime(position, duration);
      }
      if (type === 'complete' && onComplete) {
        onComplete();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onTime, onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black"
    >
      {ready && (
        <iframe
          ref={iframeRef}
          key={mediaId}
          src={jwEmbedUrl(mediaId)}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute inset-0 block h-full w-full border-0 bg-black"
          style={{ border: 0, backgroundColor: '#000' }}
          title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
        />
      )}
    </div>
  );
}
