export interface Video {
  id: string
  title: string
  brand: string
  url: string
  thumbnail: string
  duration: string
  description: string
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Limestone Legacy',
    brand: 'Château Margaux',
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    thumbnail: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=225&fit=crop&crop=center',
    duration: '2:45',
    description: 'Discover how the limestone soils of Bordeaux create wines of exceptional elegance and aging potential.'
  },
  {
    id: '2',
    title: 'Volcanic Visions',
    brand: 'Opus One',
    url: 'https://vimeo.com/45878034',
    thumbnail: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=225&fit=crop&crop=center',
    duration: '3:12',
    description: 'Explore the volcanic soils of Napa Valley and their impact on creating bold, complex wines.'
  },
  {
    id: '3',
    title: 'Terra Rossa Traditions',
    brand: 'Penfolds',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=225&fit=crop&crop=center',
    duration: '2:58',
    description: 'Journey through the terra rossa soils of Barossa Valley and their role in crafting iconic Australian wines.'
  },
  {
    id: '4',
    title: 'Galestro Grace',
    brand: 'Antinori',
    url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    thumbnail: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=225&fit=crop&crop=center',
    duration: '3:05',
    description: 'Experience the galestro and clay soils of Tuscany that give birth to wines of exceptional finesse.'
  },
  {
    id: '5',
    title: 'Granite Grandeur',
    brand: 'Chapoutier',
    url: 'https://vimeo.com/148927676',
    thumbnail: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=225&fit=crop&crop=center',
    duration: '2:52',
    description: 'Uncover the granite and schist soils of the Rhône Valley that create wines of extraordinary complexity.'
  }
] 