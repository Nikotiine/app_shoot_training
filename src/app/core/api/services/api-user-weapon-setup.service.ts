/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllUserWeaponSetup } from '../fn/api-user-weapon-setup/get-all-user-weapon-setup';
import { GetAllUserWeaponSetup$Params } from '../fn/api-user-weapon-setup/get-all-user-weapon-setup';
import { newSetup } from '../fn/api-user-weapon-setup/new-setup';
import { NewSetup$Params } from '../fn/api-user-weapon-setup/new-setup';
import { UserWeaponSetupDto } from '../models/user-weapon-setup-dto';


/**
 * User Weapon Setup Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiUserWeaponSetupService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newSetup()` */
  static readonly NewSetupPath = '/api/setup/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newSetup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newSetup$Response(params: NewSetup$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWeaponSetupDto>> {
    return newSetup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newSetup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newSetup(params: NewSetup$Params, context?: HttpContext): Observable<UserWeaponSetupDto> {
    return this.newSetup$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserWeaponSetupDto>): UserWeaponSetupDto => r.body)
    );
  }

  /** Path part for operation `getAllUserWeaponSetup()` */
  static readonly GetAllUserWeaponSetupPath = '/api/setup/by-user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserWeaponSetup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserWeaponSetup$Response(params: GetAllUserWeaponSetup$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserWeaponSetupDto>>> {
    return getAllUserWeaponSetup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserWeaponSetup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserWeaponSetup(params: GetAllUserWeaponSetup$Params, context?: HttpContext): Observable<Array<UserWeaponSetupDto>> {
    return this.getAllUserWeaponSetup$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserWeaponSetupDto>>): Array<UserWeaponSetupDto> => r.body)
    );
  }

}
