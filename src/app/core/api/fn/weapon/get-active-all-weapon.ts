/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WeaponDto } from '../../models/weapon-dto';

export interface GetActiveAllWeapon$Params {
}

export function getActiveAllWeapon(http: HttpClient, rootUrl: string, params?: GetActiveAllWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponDto>>> {
  const rb = new RequestBuilder(rootUrl, getActiveAllWeapon.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WeaponDto>>;
    })
  );
}

getActiveAllWeapon.PATH = '/api/weapon/active';
