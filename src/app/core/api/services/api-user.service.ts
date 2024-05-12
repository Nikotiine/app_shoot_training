/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { allUsers } from '../fn/api-user/all-users';
import { AllUsers$Params } from '../fn/api-user/all-users';
import { disableUser } from '../fn/api-user/disable-user';
import { DisableUser$Params } from '../fn/api-user/disable-user';
import { editProfile } from '../fn/api-user/edit-profile';
import { EditProfile$Params } from '../fn/api-user/edit-profile';
import { editUserRole } from '../fn/api-user/edit-user-role';
import { EditUserRole$Params } from '../fn/api-user/edit-user-role';
import { UserProfileDto } from '../models/user-profile-dto';


/**
 * User Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiUserService extends BaseService {
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

  /** Path part for operation `editUserRole()` */
  static readonly EditUserRolePath = '/api/user/admin/edit-role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUserRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole$Response(params: EditUserRole$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return editUserRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editUserRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole(params: EditUserRole$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.editUserRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

  /** Path part for operation `allUsers()` */
  static readonly AllUsersPath = '/api/user/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `allUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  allUsers$Response(params?: AllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    return allUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `allUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  allUsers(params?: AllUsers$Params, context?: HttpContext): Observable<Array<UserProfileDto>> {
    return this.allUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `disableUser()` */
  static readonly DisableUserPath = '/api/user/admin/disable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUser$Response(params: DisableUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    return disableUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUser(params: DisableUser$Params, context?: HttpContext): Observable<Array<UserProfileDto>> {
    return this.disableUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

}
