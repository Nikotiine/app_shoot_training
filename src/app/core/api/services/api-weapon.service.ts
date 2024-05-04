/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { disableWeapon } from '../fn/api-weapon/disable-weapon';
import { DisableWeapon$Params } from '../fn/api-weapon/disable-weapon';
import { editWeapon } from '../fn/api-weapon/edit-weapon';
import { EditWeapon$Params } from '../fn/api-weapon/edit-weapon';
import { getActiveAllWeapon } from '../fn/api-weapon/get-active-all-weapon';
import { GetActiveAllWeapon$Params } from '../fn/api-weapon/get-active-all-weapon';
import { getAllActiveCategories } from '../fn/api-weapon/get-all-active-categories';
import { GetAllActiveCategories$Params } from '../fn/api-weapon/get-all-active-categories';
import { getAllActiveType } from '../fn/api-weapon/get-all-active-type';
import { GetAllActiveType$Params } from '../fn/api-weapon/get-all-active-type';
import { getAllWeapon } from '../fn/api-weapon/get-all-weapon';
import { GetAllWeapon$Params } from '../fn/api-weapon/get-all-weapon';
import { newWeapon } from '../fn/api-weapon/new-weapon';
import { NewWeapon$Params } from '../fn/api-weapon/new-weapon';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponDto } from '../models/weapon-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';


/**
 * Weapon Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiWeaponService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editWeapon()` */
  static readonly EditWeaponPath = '/api/weapon/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWeapon()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWeapon$Response(params: EditWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponDto>> {
    return editWeapon(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editWeapon$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWeapon(params: EditWeapon$Params, context?: HttpContext): Observable<WeaponDto> {
    return this.editWeapon$Response(params, context).pipe(
      map((r: StrictHttpResponse<WeaponDto>): WeaponDto => r.body)
    );
  }

  /** Path part for operation `newWeapon()` */
  static readonly NewWeaponPath = '/api/weapon/save';

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

  /** Path part for operation `getAllActiveType()` */
  static readonly GetAllActiveTypePath = '/api/weapon/all-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllActiveType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveType$Response(params?: GetAllActiveType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponTypeDto>>> {
    return getAllActiveType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllActiveType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveType(params?: GetAllActiveType$Params, context?: HttpContext): Observable<Array<WeaponTypeDto>> {
    return this.getAllActiveType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponTypeDto>>): Array<WeaponTypeDto> => r.body)
    );
  }

  /** Path part for operation `getAllActiveCategories()` */
  static readonly GetAllActiveCategoriesPath = '/api/weapon/all-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllActiveCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveCategories$Response(params?: GetAllActiveCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponCategoryDto>>> {
    return getAllActiveCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllActiveCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveCategories(params?: GetAllActiveCategories$Params, context?: HttpContext): Observable<Array<WeaponCategoryDto>> {
    return this.getAllActiveCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponCategoryDto>>): Array<WeaponCategoryDto> => r.body)
    );
  }

  /** Path part for operation `getActiveAllWeapon()` */
  static readonly GetActiveAllWeaponPath = '/api/weapon/active';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAllWeapon()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAllWeapon$Response(params?: GetActiveAllWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return getActiveAllWeapon(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActiveAllWeapon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAllWeapon(params?: GetActiveAllWeapon$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.getActiveAllWeapon$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponDto>>): Array<WeaponDto> => r.body)
    );
  }

  /** Path part for operation `disableWeapon()` */
  static readonly DisableWeaponPath = '/api/weapon/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableWeapon()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableWeapon$Response(params: DisableWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return disableWeapon(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableWeapon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableWeapon(params: DisableWeapon$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.disableWeapon$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponDto>>): Array<WeaponDto> => r.body)
    );
  }

}
