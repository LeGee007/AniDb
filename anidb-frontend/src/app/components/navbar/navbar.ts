import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimeService } from '../../services/anime';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  query = '';

  constructor(private animeService: AnimeService, private router: Router) {}

  search() {
    if (this.query.trim()) {
      this.router.navigate(['/'], { queryParams: { q: this.query } });
    }
  }
}
