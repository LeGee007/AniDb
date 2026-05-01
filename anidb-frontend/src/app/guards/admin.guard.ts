import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);
  if (sessionStorage.getItem('admin') === 'true') return true;
  return router.createUrlTree(['/admin-login']);
};
