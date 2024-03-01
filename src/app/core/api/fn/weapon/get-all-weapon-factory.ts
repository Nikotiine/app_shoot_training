/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FactoryDto } from '../../models/factory-dto';

export interface GetAllWeaponFactory$Params {
}

export function getAllWeaponFactory(http: HttpClient, rootUrl: string, params?: GetAllWeaponFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllWeaponFactory.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FactoryDto>>;
    })
  );
}

getAllWeaponFactory.PATH = '/api/weapon/all/factory';
