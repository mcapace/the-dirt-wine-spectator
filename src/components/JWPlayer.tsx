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
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // Measure the parent container's pixel dimensions and update on any resize.
  // The iframe gets these as explicit width/height attributes, which JW Player
  // reads reliably (instead of racing the CSS layout pass).
  useEffect(() => {
    if (!containerRef.current) return;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w > 0 && h > 0) {
        setSize((prev) => (prev?.w === w && prev?.h === h ? prev : { w, h }));
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {size && (
        <iframe
          // include size in key so iframe remounts cleanly on big resizes (e.g., orientation change)
          key={`${mediaId}-${size.w}x${size.h}`}
          src={jwEmbedUrl(mediaId)}
          width={size.w}
          height={size.h}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute inset-0 block border-0 bg-black"
          style={{
            border: 0,
            backgroundColor: '#000',
            width: `${size.w}px`,
            height: `${size.h}px`,
          }}
          title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
        />
      )}
    </div>
  );
}
