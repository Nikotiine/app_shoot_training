/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllWeapon } from '../fn/weapon/get-all-weapon';
import { GetAllWeapon$Params } from '../fn/weapon/get-all-weapon';
import { getWeaponDataCollection } from '../fn/weapon/get-weapon-data-collection';
import { GetWeaponDataCollection$Params } from '../fn/weapon/get-weapon-data-collection';
import { newWeapon } from '../fn/weapon/new-weapon';
import { NewWeapon$Params } from '../fn/weapon/new-weapon';
import { WeaponDataCollection } from '../models/weapon-data-collection';
import { WeaponDto } from '../models/weapon-dto';


/**
 * Weapon Controller
 */
@Injectable({ providedIn: 'root' })
export class WeaponService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newWeapon()` */
  static readonly NewWeaponPath = '/api/weapon/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newWeapon()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newWeapon$Response(params: NewWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponDto>> {
    return newWeapon(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newWeapon$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newWeapon(params: NewWeapon$Params, context?: HttpContext): Observable<WeaponDto> {
    return this.newWeapon$Response(params, context).pipe(
      map((r: StrictHttpResponse<WeaponDto>): WeaponDto => r.body)
    );
  }

  /** Path part for operation `getWeaponDataCollection()` */
  static readonly GetWeaponDataCollectionPath = '/api/weapon/data-collection';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeaponDataCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeaponDataCollection$Response(params?: GetWeaponDataCollection$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponDataCollection>> {
    return getWeaponDataCollection(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeaponDataCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeaponDataCollection(params?: GetWeaponDataCollection$Params, context?: HttpContext): Observable<WeaponDataCollection> {
    return this.getWeaponDataCollection$Response(params, context).pipe(
      map((r: StrictHttpResponse<WeaponDataCollection>): WeaponDataCollection => r.body)
    );
  }

  /** Path part for operation `getAllWeapon()` */
  static readonly GetAllWeaponPath = '/api/weapon/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWeapon()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapon$Response(params?: GetAllWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return getAllWeapon(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWeapon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapon(params?: GetAllWeapon$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.getAllWeapon$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponDto>>): Array<WeaponDto> => r.body)
    );
  }

}
