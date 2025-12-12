// loading.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { GlobalLoadingService } from '../services/global-loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(GlobalLoadingService);

  // ❌ Não usar loading automático no /ping
  if (req.url.includes('/ping')) {
    return next(req);
  }

  loading.show();

  return next(req).pipe(
    finalize(() => loading.hide())
  );
};
