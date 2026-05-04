import WineryLanding from '@/components/landing/WineryLanding';
import { getVideoByMediaId } from '@/data/theDirtJwVideos';

export default function RobertHallPage() {
  const meta = getVideoByMediaId('nsF12zfB')!;
  return (
    <WineryLanding
      mediaId="nsF12zfB"
      title={
        <>
          Robert <em className="italic">Hall</em>
        </>
      }
      heroDescription={meta.description}
    />
  );
}
