'use client';

import { useEffect } from 'react';
import { jwEmbedUrl } from '@/data/theDirtJwVideos';

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

/**
 * JW Cloud iframe (`players/{media}-{player}.html`) — same URL as JW’s hosted player page.
 * Script-based `players/{media}-{player}.js` embeds race React lifecycle / Strict Mode and
 * often never complete setup; iframe load is reliable.
 */
export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
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
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        key={mediaId}
        src={jwEmbedUrl(mediaId)}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="absolute inset-0 block h-full w-full border-0 bg-black"
        style={{ border: 0, backgroundColor: '#000' }}
        title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
      />
    </div>
  );
}
