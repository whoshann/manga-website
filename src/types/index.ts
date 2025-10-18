// Anime Types
export interface Anime {
  id: number;
  title: string;
  thumbnail: string;
  studio?: string;
  genres: string[];
  status?: string;
  episodes?: number;
  currentEpisode?: number;
  rating: number;
  views: string;
  description?: string;
  lastUpdate?: string;
  year?: number;
  type?: string;
  episode?: string;
}

// Manga Types
export interface Manga {
  id: number;
  title: string;
  cover: string;
  author?: string;
  genres: string[];
  status?: string;
  chapters?: number;
  rating: number;
  views: string;
  description?: string;
  lastUpdate?: string;
  chapter?: string;
  type?: string;
}

// Library Item Types
export interface LibraryItem {
  id: number;
  type: 'manga' | 'anime';
  title: string;
  cover: string;
  progress: number;
  lastRead?: string;
  lastWatched?: string;
  rating: number;
  status: string;
  addedDate: string;
}

// Featured Content Types
export interface FeaturedContent {
  title: string;
  description: string;
  image: string;
  type: string;
  rating: number;
  episodes: number;
}

// Episode Types
export interface Episode {
  number: number;
  title: string;
  duration: string;
  releaseDate: string;
  views: number;
  thumbnail: string;
}

// Chapter Types
export interface Chapter {
  number: number;
  title: string;
  releaseDate: string;
  views: number;
}
