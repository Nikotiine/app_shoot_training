/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionDto } from '../../models/ammunition-dto';

export interface GetAmmunitionByCaliber$Params {
  id: number;
}

export function getAmmunitionByCaliber(http: HttpClient, rootUrl: string, params: GetAmmunitionByCaliber$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
  const rb = new RequestBuilder(rootUrl, getAmmunitionByCaliber.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
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

getAmmunitionByCaliber.PATH = '/api/ammunition/by-caliber';
