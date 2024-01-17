/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserEditDto } from '../../models/user-edit-dto';
import { UserProfileDto } from '../../models/user-profile-dto';

export interface Edit$Params {
      body: UserEditDto
}

export function edit(http: HttpClient, rootUrl: string, params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
  const rb = new RequestBuilder(rootUrl, edit.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserProfileDto>;
    })
  );
}

edit.PATH = '/api/user/edit';
