/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionFactoryDto } from '../../models/ammunition-factory-dto';

export interface GetAllFactories$Params {
}

export function getAllFactories(http: HttpClient, rootUrl: string, params?: GetAllFactories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionFactoryDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllFactories.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AmmunitionFactoryDto>>;
    })
  );
}

getAllFactories.PATH = '/api/ammunition/all/factory';
