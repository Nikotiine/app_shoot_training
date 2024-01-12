/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewPasswordRequestDto } from '../../models/new-password-request-dto';
import { ResponseMessage } from '../../models/response-message';

export interface NewPassword$Params {
      body: NewPasswordRequestDto
}

export function newPassword(http: HttpClient, rootUrl: string, params: NewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
  const rb = new RequestBuilder(rootUrl, newPassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseMessage>;
    })
  );
}

newPassword.PATH = '/api/shooter/new-password';
