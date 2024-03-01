/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AmmunitionDataCollection } from '../models/ammunition-data-collection';
import { AmmunitionDto } from '../models/ammunition-dto';
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { FactoryDto } from '../models/factory-dto';
import { getAllAmmunition } from '../fn/ammunition/get-all-ammunition';
import { GetAllAmmunition$Params } from '../fn/ammunition/get-all-ammunition';
import { getAllFactories } from '../fn/ammunition/get-all-factories';
import { GetAllFactories$Params } from '../fn/ammunition/get-all-factories';
import { getDataCollection } from '../fn/ammunition/get-data-collection';
import { GetDataCollection$Params } from '../fn/ammunition/get-data-collection';
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

  /** Path part for operation `getDataCollection()` */
  static readonly GetDataCollectionPath = '/api/ammunition/data-collection';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataCollection$Response(params?: GetDataCollection$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionDataCollection>> {
    return getDataCollection(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDataCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataCollection(params?: GetDataCollection$Params, context?: HttpContext): Observable<AmmunitionDataCollection> {
    return this.getDataCollection$Response(params, context).pipe(
      map((r: StrictHttpResponse<AmmunitionDataCollection>): AmmunitionDataCollection => r.body)
    );
  }

  /** Path part for operation `getAllFactories()` */
  static readonly GetAllFactoriesPath = '/api/ammunition/all/factory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFactories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFactories$Response(params?: GetAllFactories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
    return getAllFactories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFactories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFactories(params?: GetAllFactories$Params, context?: HttpContext): Observable<Array<FactoryDto>> {
    return this.getAllFactories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FactoryDto>>): Array<FactoryDto> => r.body)
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
