import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CustomUserService } from '../services/custom-user.service';
import { Routing } from '../enum/Routing.enum';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService, UserService } from '../../api/services';
import { CustomMessageService } from '../services/custom-message.service';
import { of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const appUserService = inject(CustomUserService);
  const router = inject(Router);

  if (!appUserService.getProfile()) {
    return inject(AuthenticationService)
      .me()
      .pipe(
        map((user) => {
          const isAdmin = user.role === 'ADMIN';
          if (!user || !isAdmin) {
            router.navigate(['/' + Routing.HOME]);
            // customMessageService.errorMessage('admin', 'Access interdit');
          }
          return isAdmin;
        }),
        catchError(() => {
          return router.navigate(['/' + Routing.HOME]);
        })
      );
  }
  return appUserService.isAdmin();
};
