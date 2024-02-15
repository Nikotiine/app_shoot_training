import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppUserService } from '../services/app-user.service';
import { Routing } from '../enum/Routing.enum';

export const adminGuard: CanActivateFn = (route, state) => {
  const authorize = inject(AppUserService).isAdmin();
  if (!authorize) {
    inject(Router).navigate(['/' + Routing.HOME]);
  }
  return authorize;
};
