import { getSoilProfile } from '@/data/theDirtJwVideos';

interface SoilSwatchProps {
  mediaId: string;
  className?: string;
}

export default function SoilSwatch({ mediaId, className = '' }: SoilSwatchProps) {
  const profile = getSoilProfile(mediaId);

  let cumulative = 0;
  const stops: string[] = [];
  profile.layers.forEach((layer) => {
    const start = cumulative * 100;
    cumulative += layer.ratio;
    const end = cumulative * 100;
    stops.push(`${layer.color} ${start}% ${end}%`);
  });
  const gradient = `linear-gradient(180deg, ${stops.join(', ')})`;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradient }}>
      {(() => {
        let acc = 0;
        return profile.layers.slice(0, -1).map((_layer, i) => {
          acc += profile.layers[i].ratio;
          return (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${acc * 100}%`,
                height: '1px',
                background: 'rgba(0,0,0,0.25)',
              }}
            />
          );
        });
      })()}

      {profile.speckles ? (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 28 100" preserveAspectRatio="none">
          <circle cx="8" cy="20" r="2" fill="#5a5a50" opacity="0.6" />
          <circle cx="18" cy="35" r="2.5" fill="#5a5a50" opacity="0.5" />
          <circle cx="12" cy="60" r="2" fill="#3a3a30" opacity="0.7" />
          <circle cx="20" cy="78" r="3" fill="#2a2a20" opacity="0.8" />
          <circle cx="6" cy="85" r="1.8" fill="#4a4a40" opacity="0.6" />
        </svg>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='40' height='40' filter='url(%23n)' opacity='0.5'/></svg>")`,
          opacity: 0.18,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
