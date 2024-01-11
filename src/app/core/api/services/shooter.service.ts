/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { forgotPassword } from '../fn/shooter/forgot-password';
import { ForgotPassword$Params } from '../fn/shooter/forgot-password';
import { newPassword } from '../fn/shooter/new-password';
import { NewPassword$Params } from '../fn/shooter/new-password';
import { ResponseMessage } from '../models/response-message';


/**
 * Shooter Controller
 */
@Injectable({ providedIn: 'root' })
export class ShooterService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newPassword()` */
  static readonly NewPasswordPath = '/api/shooter/new-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newPassword$Response(params: NewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return newPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newPassword(params: NewPassword$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.newPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/api/shooter/forgot-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

}
