import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/anime.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private api = 'http://localhost:5216/api/comments';

  constructor(private http: HttpClient) {}

  getByAnimeId(animeId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.api}/${animeId}`);
  }

  add(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.api, comment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
