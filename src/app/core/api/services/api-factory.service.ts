/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { disableFactory } from '../fn/api-factory/disable-factory';
import { DisableFactory$Params } from '../fn/api-factory/disable-factory';
import { editFactory } from '../fn/api-factory/edit-factory';
import { EditFactory$Params } from '../fn/api-factory/edit-factory';
import { FactoryDto } from '../models/factory-dto';
import { getAllFactoryByType } from '../fn/api-factory/get-all-factory-by-type';
import { GetAllFactoryByType$Params } from '../fn/api-factory/get-all-factory-by-type';
import { saveFactory } from '../fn/api-factory/save-factory';
import { SaveFactory$Params } from '../fn/api-factory/save-factory';


/**
 * Factory Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiFactoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editFactory()` */
  static readonly EditFactoryPath = '/api/factory/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editFactory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFactory$Response(params: EditFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<FactoryDto>> {
    return editFactory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editFactory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFactory(params: EditFactory$Params, context?: HttpContext): Observable<FactoryDto> {
    return this.editFactory$Response(params, context).pipe(
      map((r: StrictHttpResponse<FactoryDto>): FactoryDto => r.body)
    );
  }

  /** Path part for operation `saveFactory()` */
  static readonly SaveFactoryPath = '/api/factory/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFactory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFactory$Response(params: SaveFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<FactoryDto>> {
    return saveFactory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFactory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFactory(params: SaveFactory$Params, context?: HttpContext): Observable<FactoryDto> {
    return this.saveFactory$Response(params, context).pipe(
      map((r: StrictHttpResponse<FactoryDto>): FactoryDto => r.body)
    );
  }

  /** Path part for operation `getAllFactoryByType()` */
  static readonly GetAllFactoryByTypePath = '/api/factory/all-by-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFactoryByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFactoryByType$Response(params: GetAllFactoryByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
    return getAllFactoryByType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFactoryByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFactoryByType(params: GetAllFactoryByType$Params, context?: HttpContext): Observable<Array<FactoryDto>> {
    return this.getAllFactoryByType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FactoryDto>>): Array<FactoryDto> => r.body)
    );
  }

  /** Path part for operation `disableFactory()` */
  static readonly DisableFactoryPath = '/api/factory/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableFactory()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableFactory$Response(params: DisableFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
    return disableFactory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableFactory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableFactory(params: DisableFactory$Params, context?: HttpContext): Observable<Array<FactoryDto>> {
    return this.disableFactory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FactoryDto>>): Array<FactoryDto> => r.body)
    );
  }

}
