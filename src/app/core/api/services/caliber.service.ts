/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CaliberDto } from '../models/caliber-dto';
import { getAllCalibers } from '../fn/caliber/get-all-calibers';
import { GetAllCalibers$Params } from '../fn/caliber/get-all-calibers';


/**
 * Caliber Controller
 */
@Injectable({ providedIn: 'root' })
export class CaliberService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllCalibers()` */
  static readonly GetAllCalibersPath = '/api/caliber/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCalibers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCalibers$Response(params?: GetAllCalibers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CaliberDto>>> {
    return getAllCalibers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCalibers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCalibers(params?: GetAllCalibers$Params, context?: HttpContext): Observable<Array<CaliberDto>> {
    return this.getAllCalibers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CaliberDto>>): Array<CaliberDto> => r.body)
    );
  }

}
