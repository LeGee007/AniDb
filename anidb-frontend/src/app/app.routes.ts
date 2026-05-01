import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AnimeDetail } from './pages/anime-detail/anime-detail';
import { Admin } from './pages/admin/admin';
import { AdminLogin } from './pages/admin-login/admin-login';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'anime/:id', component: AnimeDetail },
  { path: 'admin-login', component: AdminLogin },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
];
