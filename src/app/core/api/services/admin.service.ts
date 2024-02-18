/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AdminDashboardDto } from '../models/admin-dashboard-dto';
import { getDataForDashboard } from '../fn/admin/get-data-for-dashboard';
import { GetDataForDashboard$Params } from '../fn/admin/get-data-for-dashboard';


/**
 * Admin Controller
 */
@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getDataForDashboard()` */
  static readonly GetDataForDashboardPath = '/api/admin/dashboard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataForDashboard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataForDashboard$Response(params?: GetDataForDashboard$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDashboardDto>> {
    return getDataForDashboard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDataForDashboard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataForDashboard(params?: GetDataForDashboard$Params, context?: HttpContext): Observable<AdminDashboardDto> {
    return this.getDataForDashboard$Response(params, context).pipe(
      map((r: StrictHttpResponse<AdminDashboardDto>): AdminDashboardDto => r.body)
    );
  }

}
