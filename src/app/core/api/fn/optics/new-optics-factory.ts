/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewOpticsFactoryDto } from '../../models/new-optics-factory-dto';
import { OpticsFactoryDto } from '../../models/optics-factory-dto';

export interface NewOpticsFactory$Params {
      body: NewOpticsFactoryDto
}

export function newOpticsFactory(http: HttpClient, rootUrl: string, params: NewOpticsFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<OpticsFactoryDto>> {
  const rb = new RequestBuilder(rootUrl, newOpticsFactory.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OpticsFactoryDto>;
    })
  );
}

newOpticsFactory.PATH = '/api/optics/save/factory';
