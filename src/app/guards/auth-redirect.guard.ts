import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const AuthRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Pega o usuário atual
  const user = auth.getCurrentUser();
  const uid = user?.uid || null;

  if (uid) {
    console.log('[AuthRedirectGuard] já logado → indo para home');
    router.navigate(['/home'], { replaceUrl: true });
    return false; // impede acesso à rota de login
  }

  return true; // permite acesso à rota de login
};
