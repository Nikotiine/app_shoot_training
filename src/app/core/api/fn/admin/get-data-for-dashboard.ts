/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdminDashboardDataCollection } from '../../models/admin-dashboard-data-collection';

export interface GetDataForDashboard$Params {
}

export function getDataForDashboard(http: HttpClient, rootUrl: string, params?: GetDataForDashboard$Params, context?: HttpContext): Observable<StrictHttpResponse<AdminDashboardDataCollection>> {
  const rb = new RequestBuilder(rootUrl, getDataForDashboard.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AdminDashboardDataCollection>;
    })
  );
}

getDataForDashboard.PATH = '/api/admin/dashboard';
