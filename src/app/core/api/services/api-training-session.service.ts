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
import { deleteTrainingSession } from '../fn/api-training-session/delete-training-session';
import { DeleteTrainingSession$Params } from '../fn/api-training-session/delete-training-session';
import { getActiveTrainingSessionByUserId } from '../fn/api-training-session/get-active-training-session-by-user-id';
import { GetActiveTrainingSessionByUserId$Params } from '../fn/api-training-session/get-active-training-session-by-user-id';
import { getAllTrainingSessionByUserId } from '../fn/api-training-session/get-all-training-session-by-user-id';
import { GetAllTrainingSessionByUserId$Params } from '../fn/api-training-session/get-all-training-session-by-user-id';
import { getTrainingSessionById } from '../fn/api-training-session/get-training-session-by-id';
import { GetTrainingSessionById$Params } from '../fn/api-training-session/get-training-session-by-id';
import { getTrainingSessionByUserIdGroupByMouth } from '../fn/api-training-session/get-training-session-by-user-id-group-by-mouth';
import { GetTrainingSessionByUserIdGroupByMouth$Params } from '../fn/api-training-session/get-training-session-by-user-id-group-by-mouth';
import { TrainingSessionDto } from '../models/training-session-dto';
import { TrainingSessionGroupByMouthDto } from '../models/training-session-group-by-mouth-dto';
import { updateTrainingSession } from '../fn/api-training-session/update-training-session';
import { UpdateTrainingSession$Params } from '../fn/api-training-session/update-training-session';


/**
 * Training Session Controller
 */
@Injectable({ providedIn: 'root' })
export class ApiTrainingSessionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateTrainingSession()` */
  static readonly UpdateTrainingSessionPath = '/api/training/session/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrainingSession()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrainingSession$Response(params: UpdateTrainingSession$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionDto>> {
    return updateTrainingSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTrainingSession$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrainingSession(params: UpdateTrainingSession$Params, context?: HttpContext): Observable<TrainingSessionDto> {
    return this.updateTrainingSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<TrainingSessionDto>): TrainingSessionDto => r.body)
    );
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

  /** Path part for operation `getTrainingSessionById()` */
  static readonly GetTrainingSessionByIdPath = '/api/training/session/find/one';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainingSessionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionById$Response(params: GetTrainingSessionById$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionDto>> {
    return getTrainingSessionById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainingSessionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionById(params: GetTrainingSessionById$Params, context?: HttpContext): Observable<TrainingSessionDto> {
    return this.getTrainingSessionById$Response(params, context).pipe(
      map((r: StrictHttpResponse<TrainingSessionDto>): TrainingSessionDto => r.body)
    );
  }

  /** Path part for operation `getTrainingSessionByUserIdGroupByMouth()` */
  static readonly GetTrainingSessionByUserIdGroupByMouthPath = '/api/training/session/all/user/session/by-mouth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainingSessionByUserIdGroupByMouth()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionByUserIdGroupByMouth$Response(params: GetTrainingSessionByUserIdGroupByMouth$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionGroupByMouthDto>> {
    return getTrainingSessionByUserIdGroupByMouth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainingSessionByUserIdGroupByMouth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainingSessionByUserIdGroupByMouth(params: GetTrainingSessionByUserIdGroupByMouth$Params, context?: HttpContext): Observable<TrainingSessionGroupByMouthDto> {
    return this.getTrainingSessionByUserIdGroupByMouth$Response(params, context).pipe(
      map((r: StrictHttpResponse<TrainingSessionGroupByMouthDto>): TrainingSessionGroupByMouthDto => r.body)
    );
  }

  /** Path part for operation `getAllTrainingSessionByUserId()` */
  static readonly GetAllTrainingSessionByUserIdPath = '/api/training/session/all/by/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTrainingSessionByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrainingSessionByUserId$Response(params: GetAllTrainingSessionByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrainingSessionDto>>> {
    return getAllTrainingSessionByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTrainingSessionByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrainingSessionByUserId(params: GetAllTrainingSessionByUserId$Params, context?: HttpContext): Observable<Array<TrainingSessionDto>> {
    return this.getAllTrainingSessionByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TrainingSessionDto>>): Array<TrainingSessionDto> => r.body)
    );
  }

  /** Path part for operation `getActiveTrainingSessionByUserId()` */
  static readonly GetActiveTrainingSessionByUserIdPath = '/api/training/session/active/by/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveTrainingSessionByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveTrainingSessionByUserId$Response(params: GetActiveTrainingSessionByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrainingSessionDto>>> {
    return getActiveTrainingSessionByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActiveTrainingSessionByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveTrainingSessionByUserId(params: GetActiveTrainingSessionByUserId$Params, context?: HttpContext): Observable<Array<TrainingSessionDto>> {
    return this.getActiveTrainingSessionByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TrainingSessionDto>>): Array<TrainingSessionDto> => r.body)
    );
  }

  /** Path part for operation `deleteTrainingSession()` */
  static readonly DeleteTrainingSessionPath = '/api/training/session/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTrainingSession()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrainingSession$Response(params: DeleteTrainingSession$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrainingSessionDto>>> {
    return deleteTrainingSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTrainingSession$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrainingSession(params: DeleteTrainingSession$Params, context?: HttpContext): Observable<Array<TrainingSessionDto>> {
    return this.deleteTrainingSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TrainingSessionDto>>): Array<TrainingSessionDto> => r.body)
    );
  }

}
