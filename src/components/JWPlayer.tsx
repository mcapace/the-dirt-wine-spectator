'use client';

import { useEffect, useRef } from 'react';

export interface JWPlayerProps {
  mediaId: string;
  playerId?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

type TimeEvent = {
  position?: number;
  duration?: number;
};

type JWInstance = {
  remove: () => void;
  on: (event: string, callback: (e: TimeEvent) => void) => void;
};

type JWFactory = (id: string) => {
  setup: (config: Record<string, unknown>) => JWInstance;
};

declare global {
  interface Window {
    jwplayer?: JWFactory;
  }
}

export default function JWPlayer({
  mediaId,
  playerId = 'O0V5rBgo',
  onTime,
  onComplete,
}: JWPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<JWInstance | null>(null);
  const cancelledRef = useRef(false);
  const onTimeRef = useRef(onTime);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onTimeRef.current = onTime;
  }, [onTime]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    cancelledRef.current = false;
    const containerId = `jw-player-${mediaId}-${Math.random().toString(36).slice(2)}`;
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const scriptId = `jwplayer-script-${playerId}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initPlayer = () => {
      if (cancelledRef.current || !window.jwplayer || !containerRef.current) return;

      try {
        if (playerInstanceRef.current) {
          try {
            playerInstanceRef.current.remove();
          } catch {
            /* ignore */
          }
          playerInstanceRef.current = null;
        }

        const player = window.jwplayer(containerId).setup({
          playlist: `https://cdn.jwplayer.com/v2/media/${mediaId}`,
          width: '100%',
          height: '100%',
          aspectratio: false,
          stretching: 'uniform',
          autostart: false,
          mute: false,
        });

        playerInstanceRef.current = player;

        player.on('time', (e: TimeEvent) => {
          const position = typeof e?.position === 'number' ? e.position : 0;
          const duration = typeof e?.duration === 'number' ? e.duration : 0;
          onTimeRef.current?.(position, duration);
        });

        player.on('complete', () => {
          onCompleteRef.current?.();
        });
      } catch (e) {
        console.error('JW Player setup failed', e);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://cdn.jwplayer.com/libraries/${playerId}.js`;
      script.async = true;
      script.onload = initPlayer;
      document.body.appendChild(script);
    } else if (window.jwplayer) {
      queueMicrotask(initPlayer);
    } else {
      script.addEventListener('load', initPlayer);
    }

    return () => {
      cancelledRef.current = true;
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.remove();
        } catch {
          /* ignore */
        }
        playerInstanceRef.current = null;
      }
    };
  }, [mediaId, playerId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      style={{ backgroundColor: '#000' }}
    />
  );
}
