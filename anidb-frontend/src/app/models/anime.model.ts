export interface Anime {
  id: number;
  externalId: number;
  title: string;
  genre: string;
  description: string;
  malRating: number;
  siteRating: number;
  siteRatingCount: number;
  imageUrl: string;
  releaseDate: string;
  durationMinutes: number;
  studio: string;
  numberOfEpisodes: number;
  trailerUrl: string;
}

export interface Comment {
  id: number;
  animeId: number;
  userName: string;
  content: string;
  createdAt: string;
}
