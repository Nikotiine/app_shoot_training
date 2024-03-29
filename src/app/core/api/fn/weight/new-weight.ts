/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionWeightCreateDto } from '../../models/ammunition-weight-create-dto';
import { AmmunitionWeightDto } from '../../models/ammunition-weight-dto';

export interface NewWeight$Params {
      body: AmmunitionWeightCreateDto
}

export function newWeight(http: HttpClient, rootUrl: string, params: NewWeight$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionWeightDto>> {
  const rb = new RequestBuilder(rootUrl, newWeight.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AmmunitionWeightDto>;
    })
  );
}

newWeight.PATH = '/api/weight/save';
