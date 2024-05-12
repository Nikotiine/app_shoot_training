/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OpticsFocalPlaneDto } from '../../models/optics-focal-plane-dto';

export interface GetOpticsFocalPlane$Params {
}

export function getOpticsFocalPlane(http: HttpClient, rootUrl: string, params?: GetOpticsFocalPlane$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OpticsFocalPlaneDto>>> {
  const rb = new RequestBuilder(rootUrl, getOpticsFocalPlane.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OpticsFocalPlaneDto>>;
    })
  );
}

getOpticsFocalPlane.PATH = '/api/optics/focal/plane';
