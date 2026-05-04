'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { jwEmbedUrl } from '@/data/theDirtJwVideos';

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

function readBox(el: HTMLElement): { w: number; h: number } | null {
  const r = el.getBoundingClientRect();
  const w = Math.round(r.width);
  const h = Math.round(r.height);
  if (w < 2 || h < 2) return null;
  return { w, h };
}

export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  /** JW Cloud reads iframe size on load; mount only after layout gives non-zero dimensions (avoids random zoom/crop). */
  const [iframeBox, setIframeBox] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /**
     * IMPORTANT: Once set, never change width/height on the iframe.
     * JW scales on first layout; later DOM size updates (fonts, scrollbar, flex reflow) make it look
     * “fine then zoomed.” Freeze after the first valid measurement and stop observing.
     */
    const apply = () => {
      setIframeBox((prev) => {
        if (prev) return prev;
        const next = readBox(el);
        if (!next) return prev;
        return next;
      });
    };

    apply();
    // Second pass next frame: flex + padding-bottom aspect layout can settle after first paint.
    const raf = requestAnimationFrame(() => apply());
    const ro = new ResizeObserver(() => apply());
    resizeObserverRef.current = ro;
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      resizeObserverRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!iframeBox) return;
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;
  }, [iframeBox]);

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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {iframeBox ? (
        <iframe
          ref={iframeRef}
          key={mediaId}
          src={jwEmbedUrl(mediaId)}
          width={iframeBox.w}
          height={iframeBox.h}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute left-0 top-0 block border-0 bg-black"
          style={{
            border: 0,
            backgroundColor: '#000',
            width: iframeBox.w,
            height: iframeBox.h,
          }}
          title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
        />
      ) : null}
    </div>
  );
}
