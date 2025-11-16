import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const AuthRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const uid = auth.getUid();

  if (uid) {
    console.log('[AuthRedirectGuard] já logado → indo para home');
    router.navigate(['/home'], { replaceUrl: true });
    return false;
  }

  return true;
};
