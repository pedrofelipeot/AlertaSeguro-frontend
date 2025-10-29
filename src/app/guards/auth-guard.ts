import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject<AuthService>(AuthService);
  const router = inject(Router);

  return auth.getUserObservable().pipe(
    tap(user => console.log('[AuthGuard] user:', user)),
    map(user => {
      if (user) {
        console.log('[AuthGuard] acesso permitido');
        return true;
      } else {
        console.log('[AuthGuard] redirecionando para login');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
