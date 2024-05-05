/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserProfileDto } from '../../models/user-profile-dto';

export interface DisableUser$Params {
  id: number;
}

export function disableUser(http: HttpClient, rootUrl: string, params: DisableUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserProfileDto>>> {
  const rb = new RequestBuilder(rootUrl, disableUser.PATH, 'delete');
  if (params) {
    rb.query('id', params.id, {});
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

disableUser.PATH = '/api/user/user/disable';
