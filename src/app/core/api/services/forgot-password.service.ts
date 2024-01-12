/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { requestNewPassword } from '../fn/forgot-password/request-new-password';
import { RequestNewPassword$Params } from '../fn/forgot-password/request-new-password';
import { ResponseMessage } from '../models/response-message';
import { saveNewPassword } from '../fn/forgot-password/save-new-password';
import { SaveNewPassword$Params } from '../fn/forgot-password/save-new-password';


/**
 * ForgotPassword Controller
 */
@Injectable({ providedIn: 'root' })
export class ForgotPasswordService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveNewPassword()` */
  static readonly SaveNewPasswordPath = '/api/forgot-password/save-new-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveNewPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveNewPassword$Response(params: SaveNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return saveNewPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveNewPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveNewPassword(params: SaveNewPassword$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.saveNewPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

  /** Path part for operation `requestNewPassword()` */
  static readonly RequestNewPasswordPath = '/api/forgot-password/request-new-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestNewPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestNewPassword$Response(params: RequestNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return requestNewPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestNewPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestNewPassword(params: RequestNewPassword$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.requestNewPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

}
