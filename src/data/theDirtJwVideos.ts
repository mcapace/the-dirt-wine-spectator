/**
 * Single source of truth for JW Player episodes on the homepage gallery,
 * /videos listing, and /videos/[id] pages.
 *
 * For new uploads: JW Dashboard → Media → copy the 8-character Media ID,
 * then update id, metadata, and thumbnail crop (see THUMBNAIL_OBJECT_POSITION).
 */

const JW_PLAYER_ID = 'O0V5rBgo';

export function jwEmbedUrl(mediaId: string) {
  return `https://cdn.jwplayer.com/players/${mediaId}-${JW_PLAYER_ID}.html`;
}

export function jwThumbnailUrl(mediaId: string) {
  return `https://cdn.jwplayer.com/thumbs/${mediaId}-720.jpg`;
}

export interface TheDirtJwVideo {
  id: string;
  title: string;
  winery: string;
  duration: number;
  description: string;
  cta?: {
    text: string;
    url: string;
  };
}

/** How many episodes stay fixed at the front of the homepage carousel (newest first). */
export const CAROUSEL_PIN_FIRST = 2;

export const theDirtJwVideos: TheDirtJwVideo[] = [
  {
    id: 'J4mjNPcy',
    title: 'Rocky Pond',
    winery: 'Rocky Pond Estate Winery',
    duration: 45,
    description:
      'See how Rocky Pond Estate Winery brings Columbia Valley terroir from soil to glass.',
    cta: {
      text: 'Plan a Visit',
      url: 'https://www.rockypondwinery.com/',
    },
  },
  {
    id: 'nsF12zfB',
    title: 'Robert Hall',
    winery: 'Robert Hall Winery',
    duration: 45,
    description:
      'Step into Robert Hall Winery and the Paso Robles story behind the bottle.',
    cta: {
      text: 'Learn More',
      url: 'https://www.roberthallwinery.com/',
    },
  },
  {
    id: 'bE41U3pF',
    title: 'Sullivan',
    winery: 'Sullivan Rutherford Estate',
    duration: 38,
    description:
      'Discover the story behind Sullivan Rutherford Estate and their commitment to excellence.',
    cta: {
      text: 'Inquire for Availability',
      url: 'https://sullivanwine.com/estate-experiences/',
    },
  },
  {
    id: 'oPFkkAfZ',
    title: 'HALL',
    winery: 'HALL Napa Valley',
    duration: 44,
    description: 'Explore the passion and tradition of HALL Napa Valley.',
    cta: {
      text: 'Come See Us!',
      url: 'https://www.hallwines.com/',
    },
  },
  {
    id: 'L6WSfCgB',
    title: 'Whitehaven',
    winery: 'Whitehaven Wine Company',
    duration: 49,
    description: "Learn about Whitehaven's innovative approach to winemaking.",
    cta: {
      text: 'Learn More',
      url: 'https://whitehavenwine.com',
    },
  },
  {
    id: 'kncdFPTD',
    title: 'J Vineyards',
    winery: 'J Vineyards & Winery',
    duration: 46,
    description: 'Experience the unique terroir of J Vineyards & Winery.',
    cta: {
      text: '❤️ Follow Us',
      url: 'https://www.instagram.com/jwinery/',
    },
  },
  {
    id: 'FSUUFWTG',
    title: 'Trefethen',
    winery: 'Trefethen Family Vineyards',
    duration: 43,
    description: 'Discover the artistry behind Trefethen Family Vineyards.',
    cta: {
      text: '🛒 Buy This Wine',
      url: 'https://www.trefethen.com/',
    },
  },
];

/** Thumbnail crop in the homepage carousel (object-position). Defaults to center. */
export const THUMBNAIL_OBJECT_POSITION: Record<string, string> = {
  bE41U3pF: 'center 40%',
  oPFkkAfZ: 'center 30%',
  L6WSfCgB: 'center 45%',
  kncdFPTD: 'center 42%',
  FSUUFWTG: 'center 38%',
  J4mjNPcy: 'center 40%',
  nsF12zfB: 'center 40%',
};

export function getThumbnailObjectPosition(videoId: string): string {
  return THUMBNAIL_OBJECT_POSITION[videoId] ?? 'center center';
}
