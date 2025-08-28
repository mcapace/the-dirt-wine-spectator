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
  
  // Video data for reference
  videoData: [
    {
      id: 'bE41U3pF',
      winery: 'Sullivan Rutherford Estate',
      url: '/videos/bE41U3pF',
      embedUrl: 'https://cdn.jwplayer.com/players/bE41U3pF-O0V5rBgo.html',
      cta: {
        text: 'Inquire for Availability',
        url: 'https://sullivanwine.com/estate-experiences/'
      }
    },
    {
      id: 'oPFkkAfZ',
      winery: 'HALL Napa Valley',
      url: '/videos/oPFkkAfZ',
      embedUrl: 'https://cdn.jwplayer.com/players/oPFkkAfZ-O0V5rBgo.html',
      cta: {
        text: 'Come See Us!',
        url: 'https://www.hallwines.com/'
      }
    },
    {
      id: 'L6WSfCgB',
      winery: 'Whitehaven Wine Company',
      url: '/videos/L6WSfCgB',
      embedUrl: 'https://cdn.jwplayer.com/players/L6WSfCgB-O0V5rBgo.html',
      cta: {
        text: 'Learn More',
        url: 'https://whitehavenwine.com'
      }
    },
    {
      id: 'kncdFPTD',
      winery: 'J Vineyards & Winery',
      url: '/videos/kncdFPTD',
      embedUrl: 'https://cdn.jwplayer.com/players/kncdFPTD-O0V5rBgo.html',
      cta: {
        text: '❤️ Follow Us',
        url: 'https://www.instagram.com/jwinery/'
      }
    },
    {
      id: 'FSUUFWTG',
      winery: 'Trefethen Family Vineyards',
      url: '/videos/FSUUFWTG',
      embedUrl: 'https://cdn.jwplayer.com/players/FSUUFWTG-O0V5rBgo.html',
      cta: {
        text: '🛒 Buy This Wine',
        url: 'https://www.trefethen.com/'
      }
    }
  ]
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
