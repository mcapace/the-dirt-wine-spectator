'use client';

import { useEffect, useRef } from 'react';
import { jwEmbedUrl } from '@/data/theDirtJwVideos';

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for postMessage events from the JW iframe to wire onTime/onComplete callbacks.
  // JW's iframe doesn't post these by default — it only does if the player is configured
  // to do so. For now we leave this scaffolding in place; the landing pages can fall back
  // to their existing CTA-timing approach if needed.
  useEffect(() => {
    if (!onTime && !onComplete) return;

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from JW's domain
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
    <div className="absolute inset-0 flex min-h-0 min-w-0 items-center justify-center overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        key={mediaId}
        src={jwEmbedUrl(mediaId)}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="block max-h-full max-w-full border-0 bg-black"
        style={{
          aspectRatio: '9 / 16',
          width: 'auto',
          height: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
          border: 0,
          backgroundColor: '#000',
        }}
        title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
      />
    </div>
  );
}
