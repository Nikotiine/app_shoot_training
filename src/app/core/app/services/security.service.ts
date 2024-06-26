import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Token } from '../../api/models/token';
import { UserService } from './user.service';
import { Routing } from '../enum/Routing.enum';
import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private tokenService: TokenService = inject(TokenService);
  private userService: UserService = inject(UserService);
  private router = inject(Router);
  public authenticate = signal(!!this.tokenService.getToken());
  public setAuthentication(profile: UserProfileDto): void {
    this.userService.setProfile(profile);
    this.router.navigate([Routing.HOME]);
    this.authenticate.set(true);
  }

  public saveToken(token: Token): void {
    this.tokenService.saveToken(token);
  }

  public logout(): void {
    this.authenticate.set(false);
    this.tokenService.removeToken();
    this.userService.setProfile(null);
    // this.router.navigate([Routing.HOME]);
  }

  public removeToken(): void {
    this.tokenService.removeToken();
  }

  public isLogged(): boolean {
    return !!this.tokenService.getToken();
  }
}
