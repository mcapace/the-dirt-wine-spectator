'use client';

import { useEffect, useRef } from 'react';
import { JW_PLAYER_ID, jwBotrDivId, jwPerMediaScriptUrl } from '@/data/theDirtJwVideos';

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

type JWFactory = (id: string) => JWPlayerInstance;

function getJw(): JWFactory | undefined {
  if (typeof window === 'undefined') return undefined;
  const jw = (window as unknown as { jwplayer?: JWFactory }).jwplayer;
  return typeof jw === 'function' ? jw : undefined;
}

/**
 * JW Cloud “advanced” embed for a single media item: load `players/{mediaId}-{playerId}.js`.
 * That script pulls in JW if needed and runs `jwplayer("botr_{media}_{player}_div").setup(config)`.
 * The generic `libraries/{player}.js` + manual playlist URL did not initialize playback for this account.
 */
export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  const botrId = jwBotrDivId(mediaId, JW_PLAYER_ID);
  const onTimeRef = useRef(onTime);
  const onCompleteRef = useRef(onComplete);
  onTimeRef.current = onTime;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = jwPerMediaScriptUrl(mediaId, JW_PLAYER_ID);
    script.async = true;

    const attachListeners = () => {
      const jw = getJw();
      if (!jw) return;
      let player: JWPlayerInstance;
      try {
        player = jw(botrId);
      } catch {
        return;
      }
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
    };

    script.onload = () => {
      queueMicrotask(attachListeners);
    };

    document.head.appendChild(script);

    return () => {
      try {
        getJw()?.(botrId)?.remove();
      } catch {
        /* ignore */
      }
      script.remove();
    };
  }, [mediaId]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black"
      aria-label={wineryName ? `${wineryName} — The Dirt video` : 'The Dirt video player'}
    >
      <div id={botrId} className="absolute inset-0 h-full min-h-0 w-full min-w-0" />
    </div>
  );
}
