import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Pega o usuário atual
  const user = auth.getCurrentUser();
  const uid = user?.uid || null;

  if (uid) {
    console.log('[AuthGuard] acesso permitido');
    return true; // usuário logado → permite acesso
  }

  console.log('[AuthGuard] bloqueado → redirecionando para login');
  router.navigate(['/login'], { replaceUrl: true });
  return false; // usuário não logado → bloqueia acesso
};
