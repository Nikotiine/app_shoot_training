/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResponseMessage } from '../../models/response-message';

export interface EmailVerification$Params {
  email: string;
}

export function emailVerification(http: HttpClient, rootUrl: string, params: EmailVerification$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
  const rb = new RequestBuilder(rootUrl, emailVerification.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
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

emailVerification.PATH = '/api/registration/authorize-validation/{email}';
