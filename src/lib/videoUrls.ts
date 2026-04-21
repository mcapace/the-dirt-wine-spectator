import { theDirtJwVideos, jwEmbedUrl } from '@/data/theDirtJwVideos';

// Video URL generator utility
export const videoUrls = {
  // Main videos page
  allVideos: '/videos',

  // Individual video pages
  sullivan: '/videos/bE41U3pF',
  hall: '/videos/oPFkkAfZ',
  whitehaven: '/videos/L6WSfCgB',
  jVineyards: '/videos/kncdFPTD',
  trefethen: '/videos/FSUUFWTG',
  rockyPond: '/videos/J4mjNPcy',
  robertHall: '/videos/nsF12zfB',

  // Video data for reference (includes new episodes from theDirtJwVideos)
  videoData: theDirtJwVideos.map((v) => ({
    id: v.id,
    winery: v.winery,
    url: `/videos/${v.id}`,
    embedUrl: jwEmbedUrl(v.id),
    cta: v.cta,
  })),
};

// Function to get video URL by winery name
export function getVideoUrlByWinery(wineryName: string): string | null {
  const video = videoUrls.videoData.find(v => 
    v.winery.toLowerCase().includes(wineryName.toLowerCase())
  );
  return video ? video.url : null;
}

// Function to get video URL by ID
export function getVideoUrlById(id: string): string | null {
  const video = videoUrls.videoData.find(v => v.id === id);
  return video ? video.url : null;
}
