import { ResolveFn } from '@angular/router';
import { AuthenticationService } from '../../api/services/authentication.service';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { catchError, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { UserProfileDto } from '../../api/models/user-profile-dto';

export const userResolver: ResolveFn<UserProfileDto | null | boolean> = (
  route,
  state
) => {
  console.log('Resolver');
  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  const securityService: SecurityService = inject(SecurityService);

  if (securityService.isLogged()) {
    return authenticationService.me().pipe(
      catchError((error) => {
        securityService.logout();
        return of(false);
      }),
      map((res) => res)
    );
  }
  return null;
};
