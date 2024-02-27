/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllOptics } from '../fn/optics/get-all-optics';
import { GetAllOptics$Params } from '../fn/optics/get-all-optics';
import { getOpticsDataCollection } from '../fn/optics/get-optics-data-collection';
import { GetOpticsDataCollection$Params } from '../fn/optics/get-optics-data-collection';
import { newOptics } from '../fn/optics/new-optics';
import { NewOptics$Params } from '../fn/optics/new-optics';
import { newOpticsFactory } from '../fn/optics/new-optics-factory';
import { NewOpticsFactory$Params } from '../fn/optics/new-optics-factory';
import { OpticsDataCollection } from '../models/optics-data-collection';
import { OpticsDto } from '../models/optics-dto';
import { OpticsFactoryDto } from '../models/optics-factory-dto';


/**
 * Optics Controller
 */
@Injectable({ providedIn: 'root' })
export class OpticsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newOptics()` */
  static readonly NewOpticsPath = '/api/optics/save/optics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newOptics()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newOptics$Response(params: NewOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsDto>> {
    return newOptics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newOptics$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newOptics(params: NewOptics$Params, context?: HttpContext): Observable<OpticsDto> {
    return this.newOptics$Response(params, context).pipe(
      map((r: StrictHttpResponse<OpticsDto>): OpticsDto => r.body)
    );
  }

  /** Path part for operation `newOpticsFactory()` */
  static readonly NewOpticsFactoryPath = '/api/optics/save/factory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newOpticsFactory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newOpticsFactory$Response(params: NewOpticsFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsFactoryDto>> {
    return newOpticsFactory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newOpticsFactory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newOpticsFactory(params: NewOpticsFactory$Params, context?: HttpContext): Observable<OpticsFactoryDto> {
    return this.newOpticsFactory$Response(params, context).pipe(
      map((r: StrictHttpResponse<OpticsFactoryDto>): OpticsFactoryDto => r.body)
    );
  }

  /** Path part for operation `getOpticsDataCollection()` */
  static readonly GetOpticsDataCollectionPath = '/api/optics/data-collection';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpticsDataCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsDataCollection$Response(params?: GetOpticsDataCollection$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsDataCollection>> {
    return getOpticsDataCollection(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOpticsDataCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsDataCollection(params?: GetOpticsDataCollection$Params, context?: HttpContext): Observable<OpticsDataCollection> {
    return this.getOpticsDataCollection$Response(params, context).pipe(
      map((r: StrictHttpResponse<OpticsDataCollection>): OpticsDataCollection => r.body)
    );
  }

  /** Path part for operation `getAllOptics()` */
  static readonly GetAllOpticsPath = '/api/optics/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOptics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOptics$Response(params?: GetAllOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
    return getAllOptics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOptics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOptics(params?: GetAllOptics$Params, context?: HttpContext): Observable<Array<OpticsDto>> {
    return this.getAllOptics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsDto>>): Array<OpticsDto> => r.body)
    );
  }

}
