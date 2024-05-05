/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WeaponTypeDto } from '../../models/weapon-type-dto';

export interface GetAllType$Params {
}

export function getAllType(http: HttpClient, rootUrl: string, params?: GetAllType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeaponTypeDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllType.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WeaponTypeDto>>;
    })
  );
}

getAllType.PATH = '/api/weapon/types';
