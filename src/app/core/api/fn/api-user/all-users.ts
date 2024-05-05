/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserProfileDto } from '../../models/user-profile-dto';

export interface AllUsers$Params {
}

export function allUsers(http: HttpClient, rootUrl: string, params?: AllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
  const rb = new RequestBuilder(rootUrl, allUsers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserProfileDto>>;
    })
  );
}

allUsers.PATH = '/api/user/all';
