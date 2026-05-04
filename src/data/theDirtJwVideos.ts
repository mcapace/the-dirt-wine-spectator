/**
 * Single source of truth for JW Player episodes on the homepage gallery,
 * /videos listing, and /videos/[id] pages.
 *
 * For new uploads: JW Dashboard → Media → copy the 8-character Media ID,
 * then update id, metadata, and thumbnail crop (see THUMBNAIL_OBJECT_POSITION).
 */

/** JW cloud player ID (vertical-optimized). Single source of truth for embed + iframe URLs. */
export const JW_PLAYER_ID = '5hjWylbo'

export function jwEmbedUrl(mediaId: string): string {
  const url = new URL(
    `https://cdn.jwplayer.com/players/${mediaId}-${JW_PLAYER_ID}.html`,
  )
  /** Prefer letterboxing over crop/zoom when aspect ratios differ */
  url.searchParams.set('stretching', 'uniform')
  return url.toString()
}

export function jwThumbnailUrl(mediaId: string): string {
  return `https://cdn.jwplayer.com/thumbs/${mediaId}-720.jpg`
}

export interface TheDirtJwVideo {
  id: string
  title: string
  winery: string
  duration: number
  description: string
  /** Dedicated landing route */
  landingPath: string
  cta?: {
    text: string
    url: string
  }
  /** Two-season structure; Season 02 is newest */
  season?: '01' | '02'
  region?: string
  state?: string
  soilType?: string
  founded?: string
}

export const theDirtJwVideos: TheDirtJwVideo[] = [
  {
    id: 'J4mjNPcy',
    title: 'Rocky Pond',
    winery: 'Rocky Pond Estate Winery',
    landingPath: '/rocky-pond',
    duration: 45,
    description:
      'See how Rocky Pond Estate Winery brings Columbia Valley terroir from soil to glass.',
    cta: {
      text: 'Shop Now',
      url: 'https://rockypondwinery.orderport.net/product-details/1140/2023-11-dams',
    },
    season: '02',
    region: 'Columbia Valley',
    state: 'Washington',
    soilType: 'Volcanic basalt, glacial silt',
    founded: '2009',
  },
  {
    id: 'nsF12zfB',
    title: 'Robert Hall',
    winery: 'Robert Hall Winery',
    landingPath: '/robert-hall',
    duration: 44,
    description:
      'Step into Robert Hall Winery and the Paso Robles story behind the bottle.',
    cta: {
      text: 'Discover Robert Hall',
      url: 'https://www.roberthallwinery.com/regenerative-organic-viticulture/',
    },
    season: '02',
    region: 'Paso Robles',
    state: 'California',
    soilType: 'Calcareous shale',
    founded: '1999',
  },
  {
    id: 'bE41U3pF',
    title: 'Sullivan',
    winery: 'Sullivan Rutherford Estate',
    landingPath: '/sullivan',
    duration: 38,
    description:
      'Discover the story behind Sullivan Rutherford Estate and their commitment to excellence.',
    cta: {
      text: 'Inquire for Availability',
      url: 'https://sullivanwine.com/estate-experiences/',
    },
    season: '01',
    region: 'Rutherford, Napa',
    state: 'California',
    soilType: 'Rutherford dust, alluvial loam',
    founded: '1972',
  },
  {
    id: 'oPFkkAfZ',
    title: 'HALL',
    winery: 'HALL Napa Valley',
    landingPath: '/hall',
    duration: 44,
    description: 'Explore the passion and tradition of HALL Napa Valley.',
    cta: {
      text: 'Come See Us!',
      url: 'https://www.hallwines.com/',
    },
    season: '01',
    region: 'St. Helena, Napa',
    state: 'California',
    soilType: 'Bale clay loam',
    founded: '2003',
  },
  {
    id: 'L6WSfCgB',
    title: 'Whitehaven',
    winery: 'Whitehaven Wine Company',
    landingPath: '/whitehaven',
    duration: 49,
    description: "Learn about Whitehaven's innovative approach to winemaking.",
    cta: {
      text: 'Learn More',
      url: 'https://whitehavenwine.com',
    },
    season: '01',
    region: 'Marlborough',
    state: 'New Zealand',
    soilType: 'Stony alluvial gravel',
    founded: '1994',
  },
  {
    id: 'kncdFPTD',
    title: 'J Vineyards',
    winery: 'J Vineyards & Winery',
    landingPath: '/j-vineyards',
    duration: 46,
    description: 'Experience the unique terroir of J Vineyards & Winery.',
    cta: {
      text: '❤️ Follow Us',
      url: 'https://www.instagram.com/jwinery/',
    },
    season: '01',
    region: 'Russian River Valley',
    state: 'California',
    soilType: 'Goldridge sandy loam',
    founded: '1986',
  },
  {
    id: 'FSUUFWTG',
    title: 'Trefethen',
    winery: 'Trefethen Family Vineyards',
    landingPath: '/trefethen',
    duration: 43,
    description: 'Discover the artistry behind Trefethen Family Vineyards.',
    cta: {
      text: '🛒 Buy This Wine',
      url: 'https://www.trefethen.com/',
    },
    season: '01',
    region: 'Oak Knoll, Napa',
    state: 'California',
    soilType: 'Volcanic ash, sedimentary clay',
    founded: '1968',
  },
]

/** Homepage / bento display order: Season 02 first, then Season 01. */
export const DISPLAY_ORDER: string[] = [
  'J4mjNPcy',
  'nsF12zfB',
  'bE41U3pF',
  'oPFkkAfZ',
  'L6WSfCgB',
  'kncdFPTD',
  'FSUUFWTG',
]

export function getOrderedVideos(): TheDirtJwVideo[] {
  return DISPLAY_ORDER.map((id) => theDirtJwVideos.find((v) => v.id === id)).filter(
    (v): v is TheDirtJwVideo => v !== undefined,
  )
}

/**
 * CTA + duration for a JW media id. Landing pages use this so buttons stay in sync
 * with the home carousel — edit URLs once in `theDirtJwVideos` above.
 */
export function getCtaForMediaId(
  mediaId: string,
): { text: string; url: string; duration: number } | null {
  const v = theDirtJwVideos.find((x) => x.id === mediaId)
  if (!v?.cta) return null
  return { text: v.cta.text, url: v.cta.url, duration: v.duration }
}

export function getVideoByMediaId(mediaId: string): TheDirtJwVideo | undefined {
  return theDirtJwVideos.find((v) => v.id === mediaId)
}

/** Thumbnail crop in the homepage carousel (object-position). Defaults to center. */
export const THUMBNAIL_OBJECT_POSITION: Record<string, string> = {
  bE41U3pF: 'center 40%',
  oPFkkAfZ: 'center 30%',
  L6WSfCgB: 'center 45%',
  kncdFPTD: 'center 42%',
  FSUUFWTG: 'center 38%',
  J4mjNPcy: 'center 40%',
  nsF12zfB: 'center 40%',
}

export function getThumbnailObjectPosition(videoId: string): string {
  return THUMBNAIL_OBJECT_POSITION[videoId] ?? 'center center'
}

export interface SoilLayer {
  color: string
  ratio: number // proportion of total height, summing to 1.0
}

export const SOIL_PROFILES: Record<string, { layers: SoilLayer[]; speckles?: boolean }> = {
  J4mjNPcy: {
    // Rocky Pond - Volcanic basalt over glacial silt
    layers: [
      { color: '#d4c4a0', ratio: 0.25 },
      { color: '#6a5e4a', ratio: 0.35 },
      { color: '#2a2018', ratio: 0.4 },
    ],
  },
  nsF12zfB: {
    // Robert Hall - Calcareous shale
    layers: [
      { color: '#e8dcc8', ratio: 0.35 },
      { color: '#c2a878', ratio: 0.35 },
      { color: '#8b6e44', ratio: 0.3 },
    ],
  },
  bE41U3pF: {
    // Sullivan - Rutherford dust, alluvial loam
    layers: [
      { color: '#c9a878', ratio: 0.3 },
      { color: '#8b6840', ratio: 0.35 },
      { color: '#4a3220', ratio: 0.35 },
    ],
  },
  oPFkkAfZ: {
    // HALL Napa Valley - Bale clay loam
    layers: [
      { color: '#b8907a', ratio: 0.4 },
      { color: '#8b5e3e', ratio: 0.35 },
      { color: '#4a2818', ratio: 0.25 },
    ],
  },
  L6WSfCgB: {
    // Whitehaven - Stony alluvial gravel
    layers: [
      { color: '#d4d4d0', ratio: 0.5 },
      { color: '#8b8b80', ratio: 0.3 },
      { color: '#4a4a40', ratio: 0.2 },
    ],
    speckles: true,
  },
  kncdFPTD: {
    // J Vineyards - Goldridge sandy loam
    layers: [
      { color: '#e8c896', ratio: 0.35 },
      { color: '#b8946a', ratio: 0.35 },
      { color: '#6a4e2c', ratio: 0.3 },
    ],
  },
  FSUUFWTG: {
    // Trefethen - Volcanic ash, sedimentary clay
    layers: [
      { color: '#a8a098', ratio: 0.3 },
      { color: '#6a5a48', ratio: 0.3 },
      { color: '#4a3a24', ratio: 0.4 },
    ],
  },
}

export function getSoilProfile(mediaId: string) {
  return (
    SOIL_PROFILES[mediaId] ?? {
      layers: [
        { color: '#c9a878', ratio: 0.33 },
        { color: '#8b6840', ratio: 0.33 },
        { color: '#4a3220', ratio: 0.34 },
      ],
    }
  )
}
