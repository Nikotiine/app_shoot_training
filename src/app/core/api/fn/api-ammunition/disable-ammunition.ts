/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionDto } from '../../models/ammunition-dto';

export interface DisableAmmunition$Params {
  id: number;
}

export function disableAmmunition(http: HttpClient, rootUrl: string, params: DisableAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionDto>>> {
  const rb = new RequestBuilder(rootUrl, disableAmmunition.PATH, 'delete');
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

disableAmmunition.PATH = '/api/ammunition/delete';
