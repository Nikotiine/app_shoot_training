/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { codeValidation } from '../fn/registration/code-validation';
import { CodeValidation$Params } from '../fn/registration/code-validation';
import { refreshCode } from '../fn/registration/refresh-code';
import { RefreshCode$Params } from '../fn/registration/refresh-code';
import { register } from '../fn/registration/register';
import { Register$Params } from '../fn/registration/register';
import { ResponseMessage } from '../models/response-message';


/**
 * Registration Controller
 */
@Injectable({ providedIn: 'root' })
export class RegistrationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/registration/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

  /** Path part for operation `codeValidation()` */
  static readonly CodeValidationPath = '/api/registration/code/validation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `codeValidation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  codeValidation$Response(params: CodeValidation$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return codeValidation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `codeValidation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  codeValidation(params: CodeValidation$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.codeValidation$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

  /** Path part for operation `refreshCode()` */
  static readonly RefreshCodePath = '/api/registration/code/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshCode()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshCode$Response(params: RefreshCode$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
    return refreshCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshCode$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshCode(params: RefreshCode$Params, context?: HttpContext): Observable<ResponseMessage> {
    return this.refreshCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseMessage>): ResponseMessage => r.body)
    );
  }

}
