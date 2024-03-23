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
import { disableCaliber } from '../fn/caliber/disable-caliber';
import { DisableCaliber$Params } from '../fn/caliber/disable-caliber';
import { editCaliber } from '../fn/caliber/edit-caliber';
import { EditCaliber$Params } from '../fn/caliber/edit-caliber';
import { getAllCalibers } from '../fn/caliber/get-all-calibers';
import { GetAllCalibers$Params } from '../fn/caliber/get-all-calibers';
import { saveCaliber } from '../fn/caliber/save-caliber';
import { SaveCaliber$Params } from '../fn/caliber/save-caliber';


/**
 * Caliber Controller
 */
@Injectable({ providedIn: 'root' })
export class CaliberService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editCaliber()` */
  static readonly EditCaliberPath = '/api/caliber/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editCaliber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCaliber$Response(params: EditCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<CaliberDto>> {
    return editCaliber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editCaliber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCaliber(params: EditCaliber$Params, context?: HttpContext): Observable<CaliberDto> {
    return this.editCaliber$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaliberDto>): CaliberDto => r.body)
    );
  }

  /** Path part for operation `saveCaliber()` */
  static readonly SaveCaliberPath = '/api/caliber/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCaliber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCaliber$Response(params: SaveCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<CaliberDto>> {
    return saveCaliber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCaliber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCaliber(params: SaveCaliber$Params, context?: HttpContext): Observable<CaliberDto> {
    return this.saveCaliber$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaliberDto>): CaliberDto => r.body)
    );
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

  /** Path part for operation `disableCaliber()` */
  static readonly DisableCaliberPath = '/api/caliber/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableCaliber()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableCaliber$Response(params: DisableCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CaliberDto>>> {
    return disableCaliber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableCaliber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableCaliber(params: DisableCaliber$Params, context?: HttpContext): Observable<Array<CaliberDto>> {
    return this.disableCaliber$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CaliberDto>>): Array<CaliberDto> => r.body)
    );
  }

}
