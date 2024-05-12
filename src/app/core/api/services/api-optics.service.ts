/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { disableOptics } from '../fn/api-optics/disable-optics';
import { DisableOptics$Params } from '../fn/api-optics/disable-optics';
import { editOptics } from '../fn/api-optics/edit-optics';
import { EditOptics$Params } from '../fn/api-optics/edit-optics';
import { getAllActiveOptics } from '../fn/api-optics/get-all-active-optics';
import { GetAllActiveOptics$Params } from '../fn/api-optics/get-all-active-optics';
import { getAllOptics } from '../fn/api-optics/get-all-optics';
import { GetAllOptics$Params } from '../fn/api-optics/get-all-optics';
import { getOpticsBodyDiameter } from '../fn/api-optics/get-optics-body-diameter';
import { GetOpticsBodyDiameter$Params } from '../fn/api-optics/get-optics-body-diameter';
import { getOpticsFocalPlane } from '../fn/api-optics/get-optics-focal-plane';
import { GetOpticsFocalPlane$Params } from '../fn/api-optics/get-optics-focal-plane';
import { getOpticsOutletDiameter } from '../fn/api-optics/get-optics-outlet-diameter';
import { GetOpticsOutletDiameter$Params } from '../fn/api-optics/get-optics-outlet-diameter';
import { getOpticsUnits } from '../fn/api-optics/get-optics-units';
import { GetOpticsUnits$Params } from '../fn/api-optics/get-optics-units';
import { newOptics } from '../fn/api-optics/new-optics';
import { NewOptics$Params } from '../fn/api-optics/new-optics';
import { OpticsBodyDiameterDto } from '../models/optics-body-diameter-dto';
import { OpticsDto } from '../models/optics-dto';
import { OpticsFocalPlaneDto } from '../models/optics-focal-plane-dto';
import { OpticsOutletDiameterDto } from '../models/optics-outlet-diameter-dto';
import { OpticsUnitDto } from '../models/optics-unit-dto';


/**
 * Optics Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiOpticsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editOptics()` */
  static readonly EditOpticsPath = '/api/optics/admin/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editOptics()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOptics$Response(params: EditOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsDto>> {
    return editOptics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editOptics$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOptics(params: EditOptics$Params, context?: HttpContext): Observable<OpticsDto> {
    return this.editOptics$Response(params, context).pipe(
      map((r: StrictHttpResponse<OpticsDto>): OpticsDto => r.body)
    );
  }

  /** Path part for operation `newOptics()` */
  static readonly NewOpticsPath = '/api/optics/save';

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

  /** Path part for operation `getOpticsUnits()` */
  static readonly GetOpticsUnitsPath = '/api/optics/units';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpticsUnits()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsUnits$Response(params?: GetOpticsUnits$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsUnitDto>>> {
    return getOpticsUnits(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOpticsUnits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsUnits(params?: GetOpticsUnits$Params, context?: HttpContext): Observable<Array<OpticsUnitDto>> {
    return this.getOpticsUnits$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsUnitDto>>): Array<OpticsUnitDto> => r.body)
    );
  }

  /** Path part for operation `getOpticsOutletDiameter()` */
  static readonly GetOpticsOutletDiameterPath = '/api/optics/outlet/diameter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpticsOutletDiameter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsOutletDiameter$Response(params?: GetOpticsOutletDiameter$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsOutletDiameterDto>>> {
    return getOpticsOutletDiameter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOpticsOutletDiameter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsOutletDiameter(params?: GetOpticsOutletDiameter$Params, context?: HttpContext): Observable<Array<OpticsOutletDiameterDto>> {
    return this.getOpticsOutletDiameter$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsOutletDiameterDto>>): Array<OpticsOutletDiameterDto> => r.body)
    );
  }

  /** Path part for operation `getOpticsFocalPlane()` */
  static readonly GetOpticsFocalPlanePath = '/api/optics/focal/plane';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpticsFocalPlane()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsFocalPlane$Response(params?: GetOpticsFocalPlane$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsFocalPlaneDto>>> {
    return getOpticsFocalPlane(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOpticsFocalPlane$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsFocalPlane(params?: GetOpticsFocalPlane$Params, context?: HttpContext): Observable<Array<OpticsFocalPlaneDto>> {
    return this.getOpticsFocalPlane$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsFocalPlaneDto>>): Array<OpticsFocalPlaneDto> => r.body)
    );
  }

  /** Path part for operation `getOpticsBodyDiameter()` */
  static readonly GetOpticsBodyDiameterPath = '/api/optics/body/diameter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpticsBodyDiameter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsBodyDiameter$Response(params?: GetOpticsBodyDiameter$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsBodyDiameterDto>>> {
    return getOpticsBodyDiameter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOpticsBodyDiameter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpticsBodyDiameter(params?: GetOpticsBodyDiameter$Params, context?: HttpContext): Observable<Array<OpticsBodyDiameterDto>> {
    return this.getOpticsBodyDiameter$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsBodyDiameterDto>>): Array<OpticsBodyDiameterDto> => r.body)
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

  /** Path part for operation `getAllActiveOptics()` */
  static readonly GetAllActiveOpticsPath = '/api/optics/actives';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllActiveOptics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveOptics$Response(params?: GetAllActiveOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
    return getAllActiveOptics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllActiveOptics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllActiveOptics(params?: GetAllActiveOptics$Params, context?: HttpContext): Observable<Array<OpticsDto>> {
    return this.getAllActiveOptics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsDto>>): Array<OpticsDto> => r.body)
    );
  }

  /** Path part for operation `disableOptics()` */
  static readonly DisableOpticsPath = '/api/optics/admin/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableOptics()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableOptics$Response(params: DisableOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
    return disableOptics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disableOptics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableOptics(params: DisableOptics$Params, context?: HttpContext): Observable<Array<OpticsDto>> {
    return this.disableOptics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OpticsDto>>): Array<OpticsDto> => r.body)
    );
  }

}
