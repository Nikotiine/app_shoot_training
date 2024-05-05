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
import { getAllActiveWeapons } from '../fn/api-weapon/get-all-active-weapons';
import { GetAllActiveWeapons$Params } from '../fn/api-weapon/get-all-active-weapons';
import { getAllCategories } from '../fn/api-weapon/get-all-categories';
import { GetAllCategories$Params } from '../fn/api-weapon/get-all-categories';
import { getAllType } from '../fn/api-weapon/get-all-type';
import { GetAllType$Params } from '../fn/api-weapon/get-all-type';
import { getAllWeapons } from '../fn/api-weapon/get-all-weapons';
import { GetAllWeapons$Params } from '../fn/api-weapon/get-all-weapons';
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

  /** Path part for operation `getAllType()` */
  static readonly GetAllTypePath = '/api/weapon/types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllType$Response(params?: GetAllType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponTypeDto>>> {
    return getAllType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllType(params?: GetAllType$Params, context?: HttpContext): Observable<Array<WeaponTypeDto>> {
    return this.getAllType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponTypeDto>>): Array<WeaponTypeDto> => r.body)
    );
  }

  /** Path part for operation `getAllCategories()` */
  static readonly GetAllCategoriesPath = '/api/weapon/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories$Response(params?: GetAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponCategoryDto>>> {
    return getAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: GetAllCategories$Params, context?: HttpContext): Observable<Array<WeaponCategoryDto>> {
    return this.getAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponCategoryDto>>): Array<WeaponCategoryDto> => r.body)
    );
  }

  /** Path part for operation `getAllWeapons()` */
  static readonly GetAllWeaponsPath = '/api/weapon/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWeapons()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapons$Response(params?: GetAllWeapons$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return getAllWeapons(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWeapons$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWeapons(params?: GetAllWeapons$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.getAllWeapons$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeaponDto>>): Array<WeaponDto> => r.body)
    );
  }

  /** Path part for operation `getAllActiveWeapons()` */
  static readonly GetAllActiveWeaponsPath = '/api/weapon/actives';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllActiveWeapons()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveWeapons$Response(params?: GetAllActiveWeapons$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
    return getAllActiveWeapons(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllActiveWeapons$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveWeapons(params?: GetAllActiveWeapons$Params, context?: HttpContext): Observable<Array<WeaponDto>> {
    return this.getAllActiveWeapons$Response(params, context).pipe(
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
