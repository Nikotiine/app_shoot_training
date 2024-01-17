/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { edit } from '../fn/user/edit';
import { Edit$Params } from '../fn/user/edit';
import { UserProfileDto } from '../models/user-profile-dto';


/**
 * User Controller
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `edit()` */
  static readonly EditPath = '/api/user/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `edit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit$Response(params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return edit(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `edit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit(params: Edit$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.edit$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

}
