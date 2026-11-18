'use client';

/*
 * Plays a JW Player media item as a plain HTML5 video from JW Player's CDN.
 * The JW Player embed sent analytics pings to JW Player on page load, before
 * any consent and even with GPC on; the CDN file and poster carry no tracking.
 * Same props as before, so EpisodeCarousel and WineryLanding are unchanged.
 */

interface JWPlayerProps {
  mediaId: string;
  wineryName?: string;
  onTime?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

export default function JWPlayer({ mediaId, wineryName, onTime, onComplete }: JWPlayerProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        key={mediaId}
        src={`https://cdn.jwplayer.com/videos/${mediaId}.mp4`}
        poster={`https://cdn.jwplayer.com/v2/media/${mediaId}/poster.jpg?width=1280`}
        title={wineryName ? `${wineryName} — The Dirt` : 'The Dirt video player'}
        className="absolute inset-0 block h-full w-full bg-black object-contain"
        controls
        playsInline
        preload="none"
        onTimeUpdate={
          onTime
            ? (e) => {
                const v = e.currentTarget;
                if (Number.isFinite(v.duration)) onTime(v.currentTime, v.duration);
              }
            : undefined
        }
        onEnded={onComplete}
      />
    </div>
  );
}
