/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AmmunitionDto } from '../models/ammunition-dto';
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { getAllAmmunition } from '../fn/ammunition/get-all-ammunition';
import { GetAllAmmunition$Params } from '../fn/ammunition/get-all-ammunition';
import { getAllWeight } from '../fn/ammunition/get-all-weight';
import { GetAllWeight$Params } from '../fn/ammunition/get-all-weight';
import { getWeightByCaliber } from '../fn/ammunition/get-weight-by-caliber';
import { GetWeightByCaliber$Params } from '../fn/ammunition/get-weight-by-caliber';
import { newAmmunition } from '../fn/ammunition/new-ammunition';
import { NewAmmunition$Params } from '../fn/ammunition/new-ammunition';
import { newWeight } from '../fn/ammunition/new-weight';
import { NewWeight$Params } from '../fn/ammunition/new-weight';


/**
 * Ammunition Controller
 */
@Injectable({ providedIn: 'root' })
export class AmmunitionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newWeight()` */
  static readonly NewWeightPath = '/api/ammunition/save/weight';

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

  /** Path part for operation `newAmmunition()` */
  static readonly NewAmmunitionPath = '/api/ammunition/save/ammunition';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newAmmunition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newAmmunition$Response(params: NewAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionDto>> {
    return newAmmunition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newAmmunition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newAmmunition(params: NewAmmunition$Params, context?: HttpContext): Observable<AmmunitionDto> {
    return this.newAmmunition$Response(params, context).pipe(
      map((r: StrictHttpResponse<AmmunitionDto>): AmmunitionDto => r.body)
    );
  }

  /** Path part for operation `getWeightByCaliber()` */
  static readonly GetWeightByCaliberPath = '/api/ammunition/weight-by-caliber';

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
  static readonly GetAllWeightPath = '/api/ammunition/all/weight';

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

  /** Path part for operation `getAllAmmunition()` */
  static readonly GetAllAmmunitionPath = '/api/ammunition/all/ammunition';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAmmunition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmmunition$Response(params?: GetAllAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
    return getAllAmmunition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAmmunition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmmunition(params?: GetAllAmmunition$Params, context?: HttpContext): Observable<Array<AmmunitionDto>> {
    return this.getAllAmmunition$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionDto>>): Array<AmmunitionDto> => r.body)
    );
  }

}
