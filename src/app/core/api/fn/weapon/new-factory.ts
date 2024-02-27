/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewWeaponFactoryDto } from '../../models/new-weapon-factory-dto';
import { WeaponFactoryDto } from '../../models/weapon-factory-dto';

export interface NewFactory$Params {
      body: NewWeaponFactoryDto
}

export function newFactory(http: HttpClient, rootUrl: string, params: NewFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponFactoryDto>> {
  const rb = new RequestBuilder(rootUrl, newFactory.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<WeaponFactoryDto>;
    })
  );
}

newFactory.PATH = '/api/weapon/save/factory';
