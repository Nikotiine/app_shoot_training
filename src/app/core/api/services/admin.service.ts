/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AdminDashboardDataInformation } from '../models/admin-dashboard-data-information';
import { AmmunitionDto } from '../models/ammunition-dto';
import { disableUser } from '../fn/admin/disable-user';
import { DisableUser$Params } from '../fn/admin/disable-user';
import { editUserRole } from '../fn/admin/edit-user-role';
import { EditUserRole$Params } from '../fn/admin/edit-user-role';
import { getAllAmmunition1 } from '../fn/admin/get-all-ammunition-1';
import { GetAllAmmunition1$Params } from '../fn/admin/get-all-ammunition-1';
import { getAllOptics1 } from '../fn/admin/get-all-optics-1';
import { GetAllOptics1$Params } from '../fn/admin/get-all-optics-1';
import { getAllUsers } from '../fn/admin/get-all-users';
import { GetAllUsers$Params } from '../fn/admin/get-all-users';
import { getAllWeapons } from '../fn/admin/get-all-weapons';
import { GetAllWeapons$Params } from '../fn/admin/get-all-weapons';
import { getDataForDashboard } from '../fn/admin/get-data-for-dashboard';
import { GetDataForDashboard$Params } from '../fn/admin/get-data-for-dashboard';
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';


/**
 * Admin Controller
 */
@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editUserRole()` */
  static readonly EditUserRolePath = '/api/admin/user/edit-role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUserRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole$Response(params: EditUserRole$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    return editUserRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editUserRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole(params: EditUserRole$Params, context?: HttpContext): Observable<Array<UserProfileDto>> {
    return this.editUserRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `disableUser()` */
  static readonly DisableUserPath = '/api/admin/user/disable-profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  disableUser$Response(params: DisableUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    return disableUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  disableUser(params: DisableUser$Params, context?: HttpContext): Observable<Array<UserProfileDto>> {
    return this.disableUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `getAllWeapons()` */
  static readonly GetAllWeaponsPath = '/api/admin/weapons/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWeapons()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapons$Response(params?: GetAllWeapons$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return getAllWeapons(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWeapons$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapons(params?: GetAllWeapons$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.getAllWeapons$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponDto>>): Array<WeaponDto> => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/api/admin/user/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<UserProfileDto>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserProfileDto>>): Array<UserProfileDto> => r.body)
    );
  }

  /** Path part for operation `getAllOptics1()` */
  static readonly GetAllOptics1Path = '/api/admin/optics/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOptics1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOptics1$Response(params?: GetAllOptics1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
    return getAllOptics1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOptics1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOptics1(params?: GetAllOptics1$Params, context?: HttpContext): Observable<Array<OpticsDto>> {
    return this.getAllOptics1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsDto>>): Array<OpticsDto> => r.body)
    );
  }

  /** Path part for operation `getDataForDashboard()` */
  static readonly GetDataForDashboardPath = '/api/admin/dashboard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataForDashboard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataForDashboard$Response(params?: GetDataForDashboard$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDashboardDataInformation>> {
    return getDataForDashboard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDataForDashboard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataForDashboard(params?: GetDataForDashboard$Params, context?: HttpContext): Observable<AdminDashboardDataInformation> {
    return this.getDataForDashboard$Response(params, context).pipe(
      map((r: StrictHttpResponse<AdminDashboardDataInformation>): AdminDashboardDataInformation => r.body)
    );
  }

  /** Path part for operation `getAllAmmunition1()` */
  static readonly GetAllAmmunition1Path = '/api/admin/ammunition/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAmmunition1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmmunition1$Response(params?: GetAllAmmunition1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
    return getAllAmmunition1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAmmunition1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmmunition1(params?: GetAllAmmunition1$Params, context?: HttpContext): Observable<Array<AmmunitionDto>> {
    return this.getAllAmmunition1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionDto>>): Array<AmmunitionDto> => r.body)
    );
  }

}
