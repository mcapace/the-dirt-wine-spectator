/**
 * Winery roster for marketing surfaces. Logo paths and social URLs for the original
 * five estates match FeaturedWineriesSection; Rocky Pond and Robert Hall follow the same shape.
 */
export interface Winery {
  id: number
  name: string
  mediaId: string
  logo: string
  landingPath: string
  website: string
  social: {
    instagram: string
    facebook: string
  }
}

/** Display order: Rocky Pond, Robert Hall, Sullivan, Trefethen, HALL, J Vineyards, Whitehaven */
export const wineries: Winery[] = [
  {
    id: 1,
    name: 'Rocky Pond',
    mediaId: 'J4mjNPcy',
    logo: '/Logos/Rocky-Pond-logo.png',
    landingPath: '/rocky-pond',
    website: 'https://www.rockypondvineyards.com/',
    social: {
      instagram: 'https://www.instagram.com/rockypondvineyards/',
      facebook: 'https://www.facebook.com/rockypondvineyards',
    },
  },
  {
    id: 2,
    name: 'Robert Hall',
    mediaId: 'nsF12zfB',
    logo: '/Logos/Robert-Hall-logo.png',
    landingPath: '/robert-hall',
    website: 'https://www.rhwine.com/',
    social: {
      instagram: 'https://www.instagram.com/roberthallwines/',
      facebook: 'https://www.facebook.com/roberthallwinery',
    },
  },
  {
    id: 3,
    name: 'Sullivan',
    mediaId: 'bE41U3pF',
    logo: '/Logos/SRE Logo.png',
    landingPath: '/sullivan',
    website: 'https://sullivanwine.com/',
    social: {
      instagram: 'https://www.instagram.com/sullivan.rutherford.estate',
      facebook: 'https://www.facebook.com/SullivanRutherfordEstateWinery',
    },
  },
  {
    id: 4,
    name: 'Trefethen',
    mediaId: 'FSUUFWTG',
    logo: '/Logos/TFV - Gray.png',
    landingPath: '/trefethen',
    website: 'https://www.trefethen.com/',
    social: {
      instagram: 'https://www.instagram.com/trefethenfamily/',
      facebook: 'https://www.facebook.com/trefethenfamily',
    },
  },
  {
    id: 5,
    name: 'HALL',
    mediaId: 'oPFkkAfZ',
    logo: '/Logos/HALL Napa Valley Logo - Red.png',
    landingPath: '/hall',
    website: 'https://www.hallwines.com/',
    social: {
      instagram: 'https://www.instagram.com/hallwines/',
      facebook: 'https://www.facebook.com/hallwines',
    },
  },
  {
    id: 6,
    name: 'J Vineyards',
    mediaId: 'kncdFPTD',
    logo: '/Logos/JVW_Primary_Logo_Yellow.png',
    landingPath: '/j-vineyards',
    website: 'https://www.jwine.com/',
    social: {
      instagram: 'https://www.instagram.com/jwinery/',
      facebook: 'https://www.facebook.com/JWinery',
    },
  },
  {
    id: 7,
    name: 'Whitehaven',
    mediaId: 'L6WSfCgB',
    logo: '/Logos/WHV_Logo_2019-removebg-preview.png',
    landingPath: '/whitehaven',
    website: 'https://www.whitehavenwine.com/',
    social: {
      instagram: 'https://www.instagram.com/whitehaven/?hl=en',
      facebook: 'https://www.facebook.com/whitehavenwine/',
    },
  },
]
