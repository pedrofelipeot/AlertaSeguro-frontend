import { CanActivateFn, inject } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
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
