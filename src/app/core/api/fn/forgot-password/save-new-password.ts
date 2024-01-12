/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewPasswordRequestDto } from '../../models/new-password-request-dto';
import { ResponseMessage } from '../../models/response-message';

export interface SaveNewPassword$Params {
      body: NewPasswordRequestDto
}

export function saveNewPassword(http: HttpClient, rootUrl: string, params: SaveNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseMessage>> {
  const rb = new RequestBuilder(rootUrl, saveNewPassword.PATH, 'post');
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

saveNewPassword.PATH = '/api/forgot-password/save-new-password';
