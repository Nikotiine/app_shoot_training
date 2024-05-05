/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getLastEntries } from '../fn/api-admin/get-last-entries';
import { GetLastEntries$Params } from '../fn/api-admin/get-last-entries';
import { getTotalCount } from '../fn/api-admin/get-total-count';
import { GetTotalCount$Params } from '../fn/api-admin/get-total-count';
import { LastEntriesDto } from '../models/last-entries-dto';
import { TotalCountDto } from '../models/total-count-dto';


/**
 * Admin Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiAdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTotalCount()` */
  static readonly GetTotalCountPath = '/api/admin/total/counts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTotalCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalCount$Response(params?: GetTotalCount$Params, context?: HttpContext): Observable<StrictHttpResponse<TotalCountDto>> {
    return getTotalCount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTotalCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalCount(params?: GetTotalCount$Params, context?: HttpContext): Observable<TotalCountDto> {
    return this.getTotalCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<TotalCountDto>): TotalCountDto => r.body)
    );
  }

  /** Path part for operation `getLastEntries()` */
  static readonly GetLastEntriesPath = '/api/admin/last/entries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastEntries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastEntries$Response(params?: GetLastEntries$Params, context?: HttpContext): Observable<StrictHttpResponse<LastEntriesDto>> {
    return getLastEntries(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLastEntries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastEntries(params?: GetLastEntries$Params, context?: HttpContext): Observable<LastEntriesDto> {
    return this.getLastEntries$Response(params, context).pipe(
      map((r: StrictHttpResponse<LastEntriesDto>): LastEntriesDto => r.body)
    );
  }

}
