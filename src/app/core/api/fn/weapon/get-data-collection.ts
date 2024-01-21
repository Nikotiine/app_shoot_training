/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WeaponDataCollection } from '../../models/weapon-data-collection';

export interface GetDataCollection$Params {
}

export function getDataCollection(http: HttpClient, rootUrl: string, params?: GetDataCollection$Params, context?: HttpContext): Observable<StrictHttpResponse<WeaponDataCollection>> {
  const rb = new RequestBuilder(rootUrl, getDataCollection.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<WeaponDataCollection>;
    })
  );
}

getDataCollection.PATH = '/api/weapon/data-collection';
