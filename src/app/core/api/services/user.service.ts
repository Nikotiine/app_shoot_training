/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { editProfile } from '../fn/user/edit-profile';
import { EditProfile$Params } from '../fn/user/edit-profile';
import { UserProfileDto } from '../models/user-profile-dto';


/**
 * User Controller
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editProfile()` */
  static readonly EditProfilePath = '/api/user/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProfile$Response(params: EditProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return editProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProfile(params: EditProfile$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.editProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

}
