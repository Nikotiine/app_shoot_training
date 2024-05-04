/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserWeaponSetupCreateDto } from '../../models/user-weapon-setup-create-dto';
import { UserWeaponSetupDto } from '../../models/user-weapon-setup-dto';

export interface NewSetup$Params {
      body: UserWeaponSetupCreateDto
}

export function newSetup(http: HttpClient, rootUrl: string, params: NewSetup$Params, context?: HttpContext): Observable<StrictHttpResponse<UserWeaponSetupDto>> {
  const rb = new RequestBuilder(rootUrl, newSetup.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserWeaponSetupDto>;
    })
  );
}

newSetup.PATH = '/api/setup/save';
