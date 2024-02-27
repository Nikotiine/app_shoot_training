/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionDto } from '../../models/ammunition-dto';

export interface GetAllAmmunition1$Params {
}

export function getAllAmmunition1(http: HttpClient, rootUrl: string, params?: GetAllAmmunition1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllAmmunition1.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AmmunitionDto>>;
    })
  );
}

getAllAmmunition1.PATH = '/api/admin/ammunition/all';
