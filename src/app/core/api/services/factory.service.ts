/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { FactoryDto } from '../models/factory-dto';
import { getAllFactoryByType } from '../fn/factory/get-all-factory-by-type';
import { GetAllFactoryByType$Params } from '../fn/factory/get-all-factory-by-type';
import { save } from '../fn/factory/save';
import { Save$Params } from '../fn/factory/save';


/**
 * Factory Controller
 */
@Injectable({ providedIn: 'root' })
export class FactoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/api/factory/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<FactoryDto>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<FactoryDto> {
    return this.save$Response(params, context).pipe(
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

}
