/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ShooterProfileDto } from '../../models/shooter-profile-dto';

export interface Me$Params {
}

export function me(http: HttpClient, rootUrl: string, params?: Me$Params, context?: HttpContext): Observable<StrictHttpResponse<ShooterProfileDto>> {
  const rb = new RequestBuilder(rootUrl, me.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ShooterProfileDto>;
    })
  );
}

me.PATH = '/api/authentication/me';
