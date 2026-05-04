import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function WhitehavenPage() {
  const meta = getVideoByMediaId('L6WSfCgB')!;
  return (
    <WineryLanding
      mediaId="L6WSfCgB"
      title={
        <>
          <em className="italic">Whitehaven</em> Wine Company
        </>
      }
      heroDescription={meta.description}
    />
  );
}
