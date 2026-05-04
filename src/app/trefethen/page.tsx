import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function TrefethenPage() {
  const meta = getVideoByMediaId('FSUUFWTG')!;
  return (
    <WineryLanding
      mediaId="FSUUFWTG"
      title={
        <>
          <em className="italic">Trefethen</em> Family Vineyards
        </>
      }
      heroDescription={meta.description}
    />
  );
}
