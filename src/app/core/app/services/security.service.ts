import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Token } from '../../api/models/token';
import { ShooterService } from './shooter.service';
import { ShooterProfileDto } from '../../api/models/shooter-profile-dto';
import { Routing } from '../enum/Routing.enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private tokenService: TokenService = inject(TokenService);
  private shooterService: ShooterService = inject(ShooterService);
  private router = inject(Router);
  public authenticate = signal(!!this.tokenService.getToken());
  public isAuthenticate(profile: ShooterProfileDto): void {
    this.authenticate.set(true);
    this.shooterService.setProfile(profile);
    this.router.navigate([Routing.HOME]);
  }

  public saveToken(token: Token): void {
    this.tokenService.saveToken(token);
  }

  public logout(): void {
    this.authenticate.set(false);
    this.tokenService.removeToken();
    this.router.navigate([Routing.HOME]);
  }

  public removeToken(): void {
    this.tokenService.removeToken();
  }
}
