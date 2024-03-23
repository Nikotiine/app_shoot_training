/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsDto } from '../../models/optics-dto';

export interface EditOptics$Params {
      body: OpticsDto
}

export function editOptics(http: HttpClient, rootUrl: string, params: EditOptics$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsDto>> {
  const rb = new RequestBuilder(rootUrl, editOptics.PATH, 'put');
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

editOptics.PATH = '/api/optics/edit';
