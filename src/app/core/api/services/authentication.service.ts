/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { login } from '../fn/authentication/login';
import { Login$Params } from '../fn/authentication/login';
import { me } from '../fn/authentication/me';
import { Me$Params } from '../fn/authentication/me';
import { Token } from '../models/token';
import { UserProfileDto } from '../models/user-profile-dto';


/**
 * Authentication Controller
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/authentication/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<Token>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<Token> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<Token>): Token => r.body)
    );
  }

  /** Path part for operation `me()` */
  static readonly MePath = '/api/authentication/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `me()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Response(params?: Me$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return me(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `me$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  me(params?: Me$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.me$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

}
