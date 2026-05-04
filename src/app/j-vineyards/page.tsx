import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function JVineyardsPage() {
  const meta = getVideoByMediaId('kncdFPTD')!;
  return (
    <WineryLanding
      mediaId="kncdFPTD"
      title={
        <>
          J <em className="italic">Vineyards & Winery</em>
        </>
      }
      heroDescription={meta.description}
    />
  );
}
