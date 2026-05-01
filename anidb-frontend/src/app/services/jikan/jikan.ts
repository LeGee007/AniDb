import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Anime } from '../../models/anime.model';

interface JikanAnime {
  mal_id: number;
  title: string;
  genres: { name: string }[];
  score: number;
  images: { jpg: { large_image_url: string } };
  aired: { from: string };
  duration: string;
  studios: { name: string }[];
  synopsis: string;
  episodes: number;
  trailer: { youtube_id: string | null; embed_url: string | null };
}

@Injectable({ providedIn: 'root' })
export class JikanService {
  private api = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<JikanAnime[]> {
    return this.http
      .get<{ data: JikanAnime[] }>(`${this.api}/anime?q=${query}&limit=6`)
      .pipe(map(r => r.data));
  }

  getById(malId: number): Observable<JikanAnime> {
    return this.http
      .get<{ data: JikanAnime }>(`${this.api}/anime/${malId}`)
      .pipe(map(r => r.data));
  }

  toAnime(j: JikanAnime): Partial<Anime> {
    const durationMatch = j.duration?.match(/(\d+)/);
    return {
      externalId: j.mal_id,
      title: j.title,
      genre: j.genres?.map(g => g.name).join(', ') || '',
      malRating: j.score || 0,
      imageUrl: j.images?.jpg?.large_image_url || '',
      releaseDate: j.aired?.from ? j.aired.from.split('T')[0] : '',
      durationMinutes: durationMatch ? parseInt(durationMatch[1]) : 0,
      studio: j.studios?.map(s => s.name).join(', ') || '',
      numberOfEpisodes: j.episodes || 0,
      trailerUrl: j.trailer?.embed_url
        ? j.trailer.embed_url.replace('autoplay=1', 'autoplay=0')
        : (j.trailer?.youtube_id ? `https://www.youtube.com/embed/${j.trailer.youtube_id}` : ''),
    };
  }
}
