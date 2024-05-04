/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WeaponDto } from '../../models/weapon-dto';

export interface EditWeapon$Params {
      body: WeaponDto
}

export function editWeapon(http: HttpClient, rootUrl: string, params: EditWeapon$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponDto>> {
  const rb = new RequestBuilder(rootUrl, editWeapon.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<WeaponDto>;
    })
  );
}

editWeapon.PATH = '/api/weapon/edit';
