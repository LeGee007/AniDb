import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Anime } from '../../models/anime.model';

@Component({
  selector: 'app-anime-card',
  imports: [RouterLink, DecimalPipe, DatePipe],
  templateUrl: './anime-card.html',
})
export class AnimeCard {
  @Input() anime!: Anime;
}
