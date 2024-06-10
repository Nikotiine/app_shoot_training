/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TrainingSessionGroupByMouthDto } from '../../models/training-session-group-by-mouth-dto';

export interface GetTrainingSessionByUserIdGroupByMouth$Params {
  id: number;
}

export function getTrainingSessionByUserIdGroupByMouth(http: HttpClient, rootUrl: string, params: GetTrainingSessionByUserIdGroupByMouth$Params, context?: HttpContext): Observable<StrictHttpResponse<TrainingSessionGroupByMouthDto>> {
  const rb = new RequestBuilder(rootUrl, getTrainingSessionByUserIdGroupByMouth.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TrainingSessionGroupByMouthDto>;
    })
  );
}

getTrainingSessionByUserIdGroupByMouth.PATH = '/api/training/session/all/user/session/by-mouth';
