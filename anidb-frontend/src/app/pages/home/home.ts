import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime';
import { Anime } from '../../models/anime.model';
import { AnimeCard } from '../../components/anime-card/anime-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AnimeCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  topAnimes: Anime[] = [];
  latestAnimes: Anime[] = [];
  searchResults: Anime[] = [];
  searchQuery = '';

  constructor(private animeService: AnimeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.animeService.search(params['q']).subscribe(r => this.searchResults = r);
      } else {
        this.searchQuery = '';
        this.searchResults = [];
        this.animeService.getTop().subscribe(r => this.topAnimes = r);
        this.animeService.getLatest().subscribe(r => this.latestAnimes = r);
      }
    });
  }
}
