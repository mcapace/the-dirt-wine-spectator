import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function SullivanPage() {
  const meta = getVideoByMediaId('bE41U3pF')!;
  return (
    <WineryLanding
      mediaId="bE41U3pF"
      title={
        <>
          Sullivan <em className="italic">Rutherford Estate</em>
        </>
      }
      heroDescription={meta.description}
    />
  );
}
