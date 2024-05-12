/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FactoryDto } from '../../models/factory-dto';

export interface DisableFactory$Params {
  id: number;
}

export function disableFactory(http: HttpClient, rootUrl: string, params: DisableFactory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FactoryDto>>> {
  const rb = new RequestBuilder(rootUrl, disableFactory.PATH, 'delete');
  if (params) {
    rb.query('id', params.id, {});
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

disableFactory.PATH = '/api/factory/admin/delete';
