import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Token } from '../../api/models/token';
import { UserService } from './user.service';
import { ShooterProfileDto } from '../../api/models/shooter-profile-dto';
import { Routing } from '../enum/Routing.enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private tokenService: TokenService = inject(TokenService);
  private userService: UserService = inject(UserService);
  private router = inject(Router);
  public authenticate = signal(!!this.tokenService.getToken());
  public setAuthentication(profile: ShooterProfileDto): void {
    this.authenticate.set(true);
    this.userService.setProfile(profile);
    this.router.navigate([Routing.HOME]);
  }

  public saveToken(token: Token): void {
    this.tokenService.saveToken(token);
  }

  public logout(): void {
    this.authenticate.set(false);
    this.tokenService.removeToken();
    this.userService.setProfile({});
    this.router.navigate([Routing.HOME]);
  }

  public removeToken(): void {
    this.tokenService.removeToken();
  }

  public isLogged(): boolean {
    return !!this.tokenService.getToken();
  }
}
