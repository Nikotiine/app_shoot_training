/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AmmunitionFactoryDto } from '../../models/ammunition-factory-dto';
import { NewAmmunitionFactoryDto } from '../../models/new-ammunition-factory-dto';

export interface NewAmmunitionFactory$Params {
      body: NewAmmunitionFactoryDto
}

export function newAmmunitionFactory(http: HttpClient, rootUrl: string, params: NewAmmunitionFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<AmmunitionFactoryDto>> {
  const rb = new RequestBuilder(rootUrl, newAmmunitionFactory.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AmmunitionFactoryDto>;
    })
  );
}

newAmmunitionFactory.PATH = '/api/ammunition/save/factory';
