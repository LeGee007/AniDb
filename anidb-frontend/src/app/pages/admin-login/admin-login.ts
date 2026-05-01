import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div class="border border-white/5 p-10 w-full max-w-sm bg-[#111]">
        <p class="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Kirish</p>
        <h1 class="text-white text-2xl font-semibold mb-8">Admin <span class="text-amber-400">Panel</span></h1>
        <input
          [(ngModel)]="password"
          type="password"
          placeholder="Parol"
          (keyup.enter)="login()"
          class="w-full bg-transparent border border-white/10 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder-white/20 mb-4"
        />
        <div *ngIf="error" class="text-red-400/70 text-xs mb-4 tracking-wide">✕ Parol noto'g'ri</div>
        <button (click)="login()" class="w-full bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2.5 text-sm transition-colors duration-200">
          Kirish
        </button>
      </div>
    </div>
  `,
})
export class AdminLogin {
  password = '';
  error = false;
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor(private router: Router) {}

  login() {
    if (this.password === this.ADMIN_PASSWORD) {
      sessionStorage.setItem('admin', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.error = true;
    }
  }
}
