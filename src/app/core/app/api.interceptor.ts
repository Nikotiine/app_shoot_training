import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from './services/token.service';
import { catchError } from 'rxjs/operators';
import { SecurityService } from './services/security.service';
import { of } from 'rxjs';
import { Routing } from './enum/Routing.enum';
import { Router } from '@angular/router';

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
