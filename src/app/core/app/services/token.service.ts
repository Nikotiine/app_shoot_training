import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../api/models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly cookie_token_key = 'access_token';
  private cookieService: CookieService = inject(CookieService);

  public saveToken(token: Token) {
    this.cookieService.set(this.cookie_token_key, token.token, { path: '/' });
  }

  public getToken(): string | null {
    return this.cookieService.get(this.cookie_token_key);
  }

  public removeToken(): void {
    this.cookieService.delete(this.cookie_token_key, '/');
  }
}
