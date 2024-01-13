import { ResolveFn } from '@angular/router';
import { AuthenticationService } from '../../api/services/authentication.service';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { catchError, map } from 'rxjs/operators';
import { ShooterProfileDto } from '../../api/models/shooter-profile-dto';
import { of } from 'rxjs';

export const userResolver: ResolveFn<ShooterProfileDto | null | boolean> = (
  route,
  state
) => {
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
