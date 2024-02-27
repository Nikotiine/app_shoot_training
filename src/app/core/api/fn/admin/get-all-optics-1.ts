/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsDto } from '../../models/optics-dto';

export interface GetAllOptics1$Params {
}

export function getAllOptics1(http: HttpClient, rootUrl: string, params?: GetAllOptics1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllOptics1.PATH, 'get');
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

getAllOptics1.PATH = '/api/admin/optics/all';
