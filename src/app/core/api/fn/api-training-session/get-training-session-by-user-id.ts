/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TrainingSessionDto } from '../../models/training-session-dto';

export interface GetTrainingSessionByUserId$Params {
  id: number;
}

export function getTrainingSessionByUserId(http: HttpClient, rootUrl: string, params: GetTrainingSessionByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrainingSessionDto>>> {
  const rb = new RequestBuilder(rootUrl, getTrainingSessionByUserId.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TrainingSessionDto>>;
    })
  );
}

getTrainingSessionByUserId.PATH = '/api/training/session/by-user';
