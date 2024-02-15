import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../../api/services/authentication.service';
import { AppUserService } from '../services/app-user.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  if (!inject(SecurityService).isLogged()) {
    return inject(Router).navigate(['/authentication/login']);
  }
  if (!inject(AppUserService).getProfile()) {
    return authenticationService.me().pipe(
      map((user) => {
        return !!user;
      })
    );
  } else {
    return true;
  }
};
