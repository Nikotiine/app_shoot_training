/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FactoryDto } from '../../models/factory-dto';

export interface GetAllFactoryByType$Params {
  type: 'WEAPON' | 'AMMUNITION' | 'OPTICS' | 'SOUND_REDUCER';
}

export function getAllFactoryByType(http: HttpClient, rootUrl: string, params: GetAllFactoryByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllFactoryByType.PATH, 'get');
  if (params) {
    rb.query('type', params.type, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FactoryDto>>;
    })
  );
}

getAllFactoryByType.PATH = '/api/factory/by/type';
