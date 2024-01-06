import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from './services/token.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(TokenService).getToken();

  req.headers.set('Access-Control-Allow-Origin', '*');
  if (accessToken) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    });
    return next(clone);
  }

  return next(req);
};
