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
import { getAllUsers } from '../fn/admin/get-all-users';
import { GetAllUsers$Params } from '../fn/admin/get-all-users';
import { getDataForDashboard } from '../fn/admin/get-data-for-dashboard';
import { GetDataForDashboard$Params } from '../fn/admin/get-data-for-dashboard';
import { UserProfileDto } from '../models/user-profile-dto';


/**
 * Admin Controller
 */
@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/api/admin/user';

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

}
