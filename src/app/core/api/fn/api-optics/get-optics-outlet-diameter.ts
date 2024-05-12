/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsOutletDiameterDto } from '../../models/optics-outlet-diameter-dto';

export interface GetOpticsOutletDiameter$Params {
}

export function getOpticsOutletDiameter(http: HttpClient, rootUrl: string, params?: GetOpticsOutletDiameter$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsOutletDiameterDto>>> {
  const rb = new RequestBuilder(rootUrl, getOpticsOutletDiameter.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OpticsOutletDiameterDto>>;
    })
  );
}

getOpticsOutletDiameter.PATH = '/api/optics/outlet/diameter';
