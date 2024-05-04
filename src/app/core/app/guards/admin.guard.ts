import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { Routing } from '../enum/Routing.enum';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../../api/services';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.getProfile()) {
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
  return userService.isAdmin();
};
