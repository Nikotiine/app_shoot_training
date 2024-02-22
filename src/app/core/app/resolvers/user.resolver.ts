import { ResolveFn, Router } from '@angular/router';
import { AuthenticationService } from '../../api/services/authentication.service';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { catchError, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { UserProfileDto } from '../../api/models/user-profile-dto';
import { Routing } from '../enum/Routing.enum';

export const userResolver: ResolveFn<UserProfileDto | null | boolean> = (
  route,
  state
) => {
  console.log('Resolver');
  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  const securityService: SecurityService = inject(SecurityService);
  const router: Router = inject(Router);

  if (securityService.isLogged()) {
    return authenticationService.me().pipe(
      map((res) => res),
      catchError((e) => {
        console.log(e);
        securityService.logout();
        return router.navigate(['/' + Routing.HOME]);
      })
    );
  }
  return null;
};
