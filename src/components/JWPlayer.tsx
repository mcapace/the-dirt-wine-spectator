'use client';

import { useEffect, useRef } from 'react';

interface JWPlayerProps {
  mediaId: string;
  playerId?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

declare global {
  interface Window {
    jwplayer?: any;
  }
}

export default function JWPlayer({
  mediaId,
  playerId = 'O0V5rBgo',
  onTime,
  onComplete,
}: JWPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const containerIdRef = useRef<string>(`jw-${mediaId}-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const containerId = containerIdRef.current;
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const scriptSrc = `https://cdn.jwplayer.com/players/${mediaId}-${playerId}.js`;
    const scriptId = `jw-script-${mediaId}-${playerId}`;

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initPlayer = () => {
      if (!window.jwplayer || !containerRef.current) return;

      try {
        // The cloud-hosted script auto-creates a player on a div whose id matches
        // a "botr_" pattern. To take manual control, we use jwplayer(containerId).setup().
        const instance = window.jwplayer(containerId).setup({
          playlist: `https://cdn.jwplayer.com/v2/media/${mediaId}`,
          width: '100%',
          height: '100%',
          aspectratio: false,
          stretching: 'uniform',
          autostart: false,
          mute: false,
          controls: true,
        });

        playerInstanceRef.current = instance;

        if (onTime) {
          instance.on('time', (event: any) => {
            onTime(event.position, event.duration);
          });
        }
        if (onComplete) {
          instance.on('complete', () => onComplete());
        }
      } catch (e) {
        console.error('JW Player setup failed', e);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      script.onload = initPlayer;
      document.body.appendChild(script);
    } else if (window.jwplayer) {
      // Script already loaded — init immediately
      initPlayer();
    } else {
      // Script tag exists but hasn't loaded yet — wait for it
      script.addEventListener('load', initPlayer);
    }

    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.remove();
        } catch (e) {
          // ignore teardown errors
        }
        playerInstanceRef.current = null;
      }
    };
  }, [mediaId, playerId, onTime, onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: '#000' }}
    />
  );
}
