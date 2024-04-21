/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTrainingSession } from '../fn/api-training-session/create-training-session';
import { CreateTrainingSession$Params } from '../fn/api-training-session/create-training-session';
import { getTrainingSessionByUserId } from '../fn/api-training-session/get-training-session-by-user-id';
import { GetTrainingSessionByUserId$Params } from '../fn/api-training-session/get-training-session-by-user-id';
import { TrainingSessionDto } from '../models/training-session-dto';


/**
 * Training Session Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiTrainingSessionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createTrainingSession()` */
  static readonly CreateTrainingSessionPath = '/api/training/session/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTrainingSession()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTrainingSession$Response(params: CreateTrainingSession$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionDto>> {
    return createTrainingSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTrainingSession$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTrainingSession(params: CreateTrainingSession$Params, context?: HttpContext): Observable<TrainingSessionDto> {
    return this.createTrainingSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<TrainingSessionDto>): TrainingSessionDto => r.body)
    );
  }

  /** Path part for operation `getTrainingSessionByUserId()` */
  static readonly GetTrainingSessionByUserIdPath = '/api/training/session/by-user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainingSessionByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionByUserId$Response(params: GetTrainingSessionByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrainingSessionDto>>> {
    return getTrainingSessionByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainingSessionByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionByUserId(params: GetTrainingSessionByUserId$Params, context?: HttpContext): Observable<Array<TrainingSessionDto>> {
    return this.getTrainingSessionByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TrainingSessionDto>>): Array<TrainingSessionDto> => r.body)
    );
  }

}
