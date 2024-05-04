/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { disableAmmunitionWeight } from '../fn/api-ammunition-weight/disable-ammunition-weight';
import { DisableAmmunitionWeight$Params } from '../fn/api-ammunition-weight/disable-ammunition-weight';
import { editWeight } from '../fn/api-ammunition-weight/edit-weight';
import { EditWeight$Params } from '../fn/api-ammunition-weight/edit-weight';
import { getAllWeight } from '../fn/api-ammunition-weight/get-all-weight';
import { GetAllWeight$Params } from '../fn/api-ammunition-weight/get-all-weight';
import { getWeightByCaliber } from '../fn/api-ammunition-weight/get-weight-by-caliber';
import { GetWeightByCaliber$Params } from '../fn/api-ammunition-weight/get-weight-by-caliber';
import { newWeight } from '../fn/api-ammunition-weight/new-weight';
import { NewWeight$Params } from '../fn/api-ammunition-weight/new-weight';


/**
 * Ammunition Weight Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiAmmunitionWeightService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editWeight()` */
  static readonly EditWeightPath = '/api/weight/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWeight()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWeight$Response(params: EditWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionWeightDto>> {
    return editWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editWeight$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWeight(params: EditWeight$Params, context?: HttpContext): Observable<AmmunitionWeightDto> {
    return this.editWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<AmmunitionWeightDto>): AmmunitionWeightDto => r.body)
    );
  }

  /** Path part for operation `newWeight()` */
  static readonly NewWeightPath = '/api/weight/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newWeight()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newWeight$Response(params: NewWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionWeightDto>> {
    return newWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newWeight$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newWeight(params: NewWeight$Params, context?: HttpContext): Observable<AmmunitionWeightDto> {
    return this.newWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<AmmunitionWeightDto>): AmmunitionWeightDto => r.body)
    );
  }

  /** Path part for operation `getWeightByCaliber()` */
  static readonly GetWeightByCaliberPath = '/api/weight/by-caliber';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeightByCaliber()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeightByCaliber$Response(params: GetWeightByCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionWeightDto>>> {
    return getWeightByCaliber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeightByCaliber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeightByCaliber(params: GetWeightByCaliber$Params, context?: HttpContext): Observable<Array<AmmunitionWeightDto>> {
    return this.getWeightByCaliber$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionWeightDto>>): Array<AmmunitionWeightDto> => r.body)
    );
  }

  /** Path part for operation `getAllWeight()` */
  static readonly GetAllWeightPath = '/api/weight/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWeight()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeight$Response(params?: GetAllWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionWeightDto>>> {
    return getAllWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWeight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeight(params?: GetAllWeight$Params, context?: HttpContext): Observable<Array<AmmunitionWeightDto>> {
    return this.getAllWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionWeightDto>>): Array<AmmunitionWeightDto> => r.body)
    );
  }

  /** Path part for operation `disableAmmunitionWeight()` */
  static readonly DisableAmmunitionWeightPath = '/api/weight/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableAmmunitionWeight()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAmmunitionWeight$Response(params: DisableAmmunitionWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionWeightDto>>> {
    return disableAmmunitionWeight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableAmmunitionWeight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAmmunitionWeight(params: DisableAmmunitionWeight$Params, context?: HttpContext): Observable<Array<AmmunitionWeightDto>> {
    return this.disableAmmunitionWeight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionWeightDto>>): Array<AmmunitionWeightDto> => r.body)
    );
  }

}
