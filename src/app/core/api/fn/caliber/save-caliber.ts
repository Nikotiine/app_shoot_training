/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaliberCreateDto } from '../../models/caliber-create-dto';
import { CaliberDto } from '../../models/caliber-dto';

export interface SaveCaliber$Params {
      body: CaliberCreateDto
}

export function saveCaliber(http: HttpClient, rootUrl: string, params: SaveCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<CaliberDto>> {
  const rb = new RequestBuilder(rootUrl, saveCaliber.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaliberDto>;
    })
  );
}

saveCaliber.PATH = '/api/caliber/save';
