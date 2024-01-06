import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private tokenService = inject(TokenService);
  private router = inject(Router);
  public authenticate = signal(false);
  public isLogged(): void {
    this.authenticate.set(true);
    this.router.navigate(['/home']);
  }

  public logout(): void {
    this.authenticate.set(false);
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }
}
