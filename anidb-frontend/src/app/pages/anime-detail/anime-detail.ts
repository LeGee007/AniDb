import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime';
import { CommentService } from '../../services/comment';
import { Anime, Comment } from '../../models/anime.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './anime-detail.html',
})
export class AnimeDetail implements OnInit {
  anime: Anime | null = null;
  comments: Comment[] = [];
  userName = '';
  content = '';
  userScore: number | null = null;
  rateMsg = '';
  trailerEmbedUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private commentService: CommentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animeService.getById(id).subscribe(a => {
      this.anime = a;
      if (a.trailerUrl) {
        this.trailerEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(a.trailerUrl);
      }
    });
    this.commentService.getByAnimeId(id).subscribe(c => this.comments = c);
  }

  extractYoutubeId(url: string): string | null {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
  }

  submitComment() {
    if (!this.userName.trim() || !this.content.trim()) return;
    this.commentService.add({
      animeId: this.anime!.id,
      userName: this.userName,
      content: this.content,
    }).subscribe(c => {
      this.comments.unshift(c);
      this.userName = '';
      this.content = '';
    });
  }

  rate(score: number) {
    this.userScore = score;
    this.animeService.rate(this.anime!.id, score).subscribe(a => {
      this.anime = a;
      this.rateMsg = 'Bahoyingiz qabul qilindi!';
    });
  }
}
