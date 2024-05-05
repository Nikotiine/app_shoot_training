/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TotalCountDto } from '../../models/total-count-dto';

export interface GetTotalCount$Params {
}

export function getTotalCount(http: HttpClient, rootUrl: string, params?: GetTotalCount$Params, context?: HttpContext): Observable<StrictHttpResponse<TotalCountDto>> {
  const rb = new RequestBuilder(rootUrl, getTotalCount.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TotalCountDto>;
    })
  );
}

getTotalCount.PATH = '/api/admin/total/counts';
