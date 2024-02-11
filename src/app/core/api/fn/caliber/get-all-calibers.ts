/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaliberDto } from '../../models/caliber-dto';

export interface GetAllCalibers$Params {
}

export function getAllCalibers(http: HttpClient, rootUrl: string, params?: GetAllCalibers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CaliberDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllCalibers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CaliberDto>>;
    })
  );
}

getAllCalibers.PATH = '/api/caliber/all';
