/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserWeaponSetupDto } from '../../models/user-weapon-setup-dto';

export interface GetAllUserWeaponSetup$Params {
  id: number;
}

export function getAllUserWeaponSetup(http: HttpClient, rootUrl: string, params: GetAllUserWeaponSetup$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserWeaponSetupDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllUserWeaponSetup.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserWeaponSetupDto>>;
    })
  );
}

getAllUserWeaponSetup.PATH = '/api/setup/by/user';
