import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function RockyPondPage() {
  const meta = getVideoByMediaId('J4mjNPcy')!;
  return (
    <WineryLanding
      mediaId="J4mjNPcy"
      title={
        <>
          Rocky Pond <em className="italic">Estate Winery</em>
        </>
      }
      heroDescription={meta.description}
    />
  );
}
