/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionDto } from '../../models/ammunition-dto';
import { NewAmmunitionDto } from '../../models/new-ammunition-dto';

export interface NewAmmunition$Params {
      body: NewAmmunitionDto
}

export function newAmmunition(http: HttpClient, rootUrl: string, params: NewAmmunition$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionDto>> {
  const rb = new RequestBuilder(rootUrl, newAmmunition.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AmmunitionDto>;
    })
  );
}

newAmmunition.PATH = '/api/ammunition/save/ammunition';
