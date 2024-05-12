/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TrainingSessionDto } from '../../models/training-session-dto';

export interface UpdateTrainingSession$Params {
      body: TrainingSessionDto
}

export function updateTrainingSession(http: HttpClient, rootUrl: string, params: UpdateTrainingSession$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionDto>> {
  const rb = new RequestBuilder(rootUrl, updateTrainingSession.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TrainingSessionDto>;
    })
  );
}

updateTrainingSession.PATH = '/api/training/session/edit';
