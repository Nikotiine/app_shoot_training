/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LastEntriesDto } from '../../models/last-entries-dto';

export interface GetLastEntries$Params {
}

export function getLastEntries(http: HttpClient, rootUrl: string, params?: GetLastEntries$Params, context?: HttpContext): Observable<StrictHttpResponse<LastEntriesDto>> {
  const rb = new RequestBuilder(rootUrl, getLastEntries.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LastEntriesDto>;
    })
  );
}

getLastEntries.PATH = '/api/admin/last/entries';
