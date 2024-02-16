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
import { getWeightByCaliber } from '../fn/ammunition/get-weight-by-caliber';
import { GetWeightByCaliber$Params } from '../fn/ammunition/get-weight-by-caliber';
import { newAmmunition } from '../fn/ammunition/new-ammunition';
import { NewAmmunition$Params } from '../fn/ammunition/new-ammunition';


/**
 * Ammunition Controller
 */
@Injectable({ providedIn: 'root' })
export class AmmunitionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newAmmunition()` */
  static readonly NewAmmunitionPath = '/api/ammunition/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newAmmunition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newAmmunition$Response(params?: NewAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionDto>> {
    return newAmmunition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newAmmunition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newAmmunition(params?: NewAmmunition$Params, context?: HttpContext): Observable<AmmunitionDto> {
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

}
