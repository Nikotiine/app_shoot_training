/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionWeightDto } from '../../models/ammunition-weight-dto';

export interface DisableAmmunitionWeight$Params {
  id: number;
}

export function disableAmmunitionWeight(http: HttpClient, rootUrl: string, params: DisableAmmunitionWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AmmunitionWeightDto>>> {
  const rb = new RequestBuilder(rootUrl, disableAmmunitionWeight.PATH, 'delete');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AmmunitionWeightDto>>;
    })
  );
}

disableAmmunitionWeight.PATH = '/api/weight/delete';
