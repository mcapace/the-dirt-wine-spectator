import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function HallPage() {
  const meta = getVideoByMediaId('oPFkkAfZ')!;
  return (
    <WineryLanding
      mediaId="oPFkkAfZ"
      title={
        <>
          <em className="italic">HALL</em> Napa Valley
        </>
      }
      heroDescription={meta.description}
    />
  );
}
