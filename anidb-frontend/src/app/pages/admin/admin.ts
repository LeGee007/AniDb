import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime';
import { JikanService } from '../../services/jikan/jikan';
import { Anime } from '../../models/anime.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

const ALL_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror',
  'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance',
  'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller',
  'Isekai', 'Shounen', 'Shoujo', 'Seinen', 'Josei', 'Harem', 'Historical',
  'Military', 'Parody', 'School', 'Super Power', 'Vampire', 'Demons', 'Game',
];

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  animes: Anime[] = [];
  form: Partial<Anime> = {};
  editingId: number | null = null;
  showForm = false;

  jikanQuery = '';
  jikanResults: any[] = [];
  jikanLoading = false;
  private search$ = new Subject<string>();

  // Genre multi-select
  genreInput = '';
  selectedGenres: string[] = [];
  get filteredGenres(): string[] {
    if (!this.genreInput.trim()) return [];
    const q = this.genreInput.toLowerCase();
    return ALL_GENRES.filter(
      g => g.toLowerCase().includes(q) && !this.selectedGenres.includes(g)
    );
  }

  constructor(private animeService: AnimeService, private jikan: JikanService) {}

  ngOnInit() {
    this.load();
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(q => this.jikan.search(q))
    ).subscribe(r => this.jikanResults = r);
  }

  load() {
    this.animeService.getAll().subscribe(a => this.animes = a);
  }

  onJikanSearch() {
    if (this.jikanQuery.trim().length > 1) this.search$.next(this.jikanQuery);
    else this.jikanResults = [];
  }

  selectJikan(item: any) {
    this.jikanResults = [];
    this.jikanQuery = '';
    this.jikanLoading = true;
    this.jikan.getById(item.mal_id).subscribe(full => {
      console.log('Jikan trailer:', full.trailer);
      const anime = this.jikan.toAnime(full);
      this.form = { ...anime, description: '' };
      this.selectedGenres = anime.genre ? anime.genre.split(', ').filter(Boolean) : [];
      this.jikanLoading = false;
    });
  }

  addGenre(genre: string) {
    if (!this.selectedGenres.includes(genre)) this.selectedGenres.push(genre);
    this.genreInput = '';
  }

  removeGenre(genre: string) {
    this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
  }

  openCreate() {
    this.form = {};
    this.selectedGenres = [];
    this.genreInput = '';
    this.editingId = null;
    this.showForm = true;
    this.jikanResults = [];
    this.jikanQuery = '';
  }

  openEdit(anime: Anime) {
    this.form = { ...anime };
    this.selectedGenres = anime.genre ? anime.genre.split(', ').filter(Boolean) : [];
    this.genreInput = '';
    this.editingId = anime.id;
    this.showForm = true;
  }

  save() {
    const payload = { ...this.form, genre: this.selectedGenres.join(', ') };
    if (this.editingId) {
      this.animeService.update(this.editingId, payload).subscribe(() => {
        this.load(); this.showForm = false;
      });
    } else {
      this.animeService.create(payload).subscribe(() => {
        this.load(); this.showForm = false;
      });
    }
  }

  delete(id: number) {
    if (confirm('Delete this anime?')) {
      this.animeService.delete(id).subscribe(() => this.load());
    }
  }
}
