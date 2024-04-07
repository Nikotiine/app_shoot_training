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
import { disableAmmunition } from '../fn/ammunition/disable-ammunition';
import { DisableAmmunition$Params } from '../fn/ammunition/disable-ammunition';
import { editAmmunition } from '../fn/ammunition/edit-ammunition';
import { EditAmmunition$Params } from '../fn/ammunition/edit-ammunition';
import { getAllAmmunition } from '../fn/ammunition/get-all-ammunition';
import { GetAllAmmunition$Params } from '../fn/ammunition/get-all-ammunition';
import { getAmmunitionByCaliber } from '../fn/ammunition/get-ammunition-by-caliber';
import { GetAmmunitionByCaliber$Params } from '../fn/ammunition/get-ammunition-by-caliber';
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

  /** Path part for operation `editAmmunition()` */
  static readonly EditAmmunitionPath = '/api/ammunition/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editAmmunition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editAmmunition$Response(params: EditAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionDto>> {
    return editAmmunition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editAmmunition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editAmmunition(params: EditAmmunition$Params, context?: HttpContext): Observable<AmmunitionDto> {
    return this.editAmmunition$Response(params, context).pipe(
      map((r: StrictHttpResponse<AmmunitionDto>): AmmunitionDto => r.body)
    );
  }

  /** Path part for operation `newAmmunition()` */
  static readonly NewAmmunitionPath = '/api/ammunition/save';

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

  /** Path part for operation `getAmmunitionByCaliber()` */
  static readonly GetAmmunitionByCaliberPath = '/api/ammunition/by-caliber';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAmmunitionByCaliber()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmmunitionByCaliber$Response(params: GetAmmunitionByCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
    return getAmmunitionByCaliber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAmmunitionByCaliber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmmunitionByCaliber(params: GetAmmunitionByCaliber$Params, context?: HttpContext): Observable<Array<AmmunitionDto>> {
    return this.getAmmunitionByCaliber$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionDto>>): Array<AmmunitionDto> => r.body)
    );
  }

  /** Path part for operation `getAllAmmunition()` */
  static readonly GetAllAmmunitionPath = '/api/ammunition/all';

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

  /** Path part for operation `disableAmmunition()` */
  static readonly DisableAmmunitionPath = '/api/ammunition/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableAmmunition()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAmmunition$Response(params: DisableAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
    return disableAmmunition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableAmmunition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableAmmunition(params: DisableAmmunition$Params, context?: HttpContext): Observable<Array<AmmunitionDto>> {
    return this.disableAmmunition$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AmmunitionDto>>): Array<AmmunitionDto> => r.body)
    );
  }

}
