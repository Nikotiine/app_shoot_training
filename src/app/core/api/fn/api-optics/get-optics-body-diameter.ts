/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsBodyDiameterDto } from '../../models/optics-body-diameter-dto';

export interface GetOpticsBodyDiameter$Params {
}

export function getOpticsBodyDiameter(http: HttpClient, rootUrl: string, params?: GetOpticsBodyDiameter$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsBodyDiameterDto>>> {
  const rb = new RequestBuilder(rootUrl, getOpticsBodyDiameter.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OpticsBodyDiameterDto>>;
    })
  );
}

getOpticsBodyDiameter.PATH = '/api/optics/body/diameter';
