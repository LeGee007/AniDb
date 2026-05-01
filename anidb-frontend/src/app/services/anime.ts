import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime.model';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private api = 'http://localhost:5216/api/animes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.api);
  }

  getById(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.api}/${id}`);
  }

  getTop(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.api}/top`);
  }

  getLatest(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.api}/latest`);
  }

  search(query: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.api}/search?query=${query}`);
  }

  rate(id: number, score: number): Observable<Anime> {
    return this.http.post<Anime>(`${this.api}/${id}/rate`, score);
  }

  create(anime: Partial<Anime>): Observable<Anime> {
    return this.http.post<Anime>('http://localhost:5216/api/admin/create', anime);
  }

  update(id: number, anime: Partial<Anime>): Observable<Anime> {
    return this.http.put<Anime>(`http://localhost:5216/api/admin/update/${id}`, anime);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5216/api/admin/delete/${id}`);
  }
}
