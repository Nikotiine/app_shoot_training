/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsCreateDto } from '../../models/optics-create-dto';
import { OpticsDto } from '../../models/optics-dto';

export interface NewOptics$Params {
      body: OpticsCreateDto
}

export function newOptics(http: HttpClient, rootUrl: string, params: NewOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsDto>> {
  const rb = new RequestBuilder(rootUrl, newOptics.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OpticsDto>;
    })
  );
}

newOptics.PATH = '/api/optics/save';
