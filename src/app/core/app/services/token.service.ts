import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../api/models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private cookie_token_key = 'access_token';
  constructor(private readonly cookieService: CookieService) {}

  public saveToken(token: Token) {
    this.cookieService.set(this.cookie_token_key, token.token);
  }

  public getToken(): string | null {
    return this.cookieService.get(this.cookie_token_key);
  }
}
