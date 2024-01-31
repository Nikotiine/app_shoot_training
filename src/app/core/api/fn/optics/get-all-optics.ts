/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsDto } from '../../models/optics-dto';

export interface GetAllOptics$Params {
}

export function getAllOptics(http: HttpClient, rootUrl: string, params?: GetAllOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllOptics.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OpticsDto>>;
    })
  );
}

getAllOptics.PATH = '/api/optics/all';
