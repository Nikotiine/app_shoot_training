import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../../api/services/authentication.service';
import { CustomUserService } from '../services/custom-user.service';
import { catchError, map } from 'rxjs/operators';
import { Routing } from '../enum/Routing.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  const router = inject(Router);
  if (!inject(SecurityService).isLogged()) {
    return router.navigate(['/authentication/login']);
  }
  if (!inject(CustomUserService).getProfile()) {
    return authenticationService.me().pipe(
      map((user) => {
        return !!user;
      }),
      catchError(() => {
        return router.navigate(['/' + Routing.HOME]);
      })
    );
  } else {
    return true;
  }
};
