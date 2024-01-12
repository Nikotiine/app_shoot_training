/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RefreshCodeRequest } from '../../models/refresh-code-request';
import { ResponseMessage } from '../../models/response-message';

export interface RequestNewPassword$Params {
      body: RefreshCodeRequest
}

export function requestNewPassword(http: HttpClient, rootUrl: string, params: RequestNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
  const rb = new RequestBuilder(rootUrl, requestNewPassword.PATH, 'post');
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

requestNewPassword.PATH = '/api/forgot-password/request-new-password';
