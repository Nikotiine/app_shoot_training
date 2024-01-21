/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewWeaponDto } from '../../models/new-weapon-dto';
import { Weapon } from '../../models/weapon';

export interface NewWeapon$Params {
      body: NewWeaponDto
}

export function newWeapon(http: HttpClient, rootUrl: string, params: NewWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<Weapon>> {
  const rb = new RequestBuilder(rootUrl, newWeapon.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Weapon>;
    })
  );
}

newWeapon.PATH = '/api/weapon/new';
