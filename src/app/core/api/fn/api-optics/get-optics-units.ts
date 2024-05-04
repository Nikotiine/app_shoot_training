/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsUnitDto } from '../../models/optics-unit-dto';

export interface GetOpticsUnits$Params {
}

export function getOpticsUnits(http: HttpClient, rootUrl: string, params?: GetOpticsUnits$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsUnitDto>>> {
  const rb = new RequestBuilder(rootUrl, getOpticsUnits.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OpticsUnitDto>>;
    })
  );
}

getOpticsUnits.PATH = '/api/optics/units';
