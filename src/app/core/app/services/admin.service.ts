import { inject, Injectable } from '@angular/core';
import { MapperUserService } from '../api-service-mapper/mapper-user.service';

import { UserProfileDto } from '../../api/models/user-profile-dto';
import { Observable } from 'rxjs';
import { ApiAdminService } from '../../api/services/api-admin.service';
import { TotalCountDto } from '../../api/models/total-count-dto';
import { LastEntriesDto } from '../../api/models/last-entries-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly mapperUserService: MapperUserService =
    inject(MapperUserService);
  private readonly apiAdminService: ApiAdminService = inject(ApiAdminService);

  public editUserRole(profile: UserProfileDto): Observable<UserProfileDto> {
    return this.mapperUserService.editRole(profile);
  }
  public disableUser(id: number): Observable<UserProfileDto[]> {
    return this.mapperUserService.disable(id);
  }
  public getAllUsers(): Observable<UserProfileDto[]> {
    return this.mapperUserService.getAll();
  }
  public getTotalCount(): Observable<TotalCountDto> {
    return this.apiAdminService.getTotalCount();
  }
  public getLastEntries(): Observable<LastEntriesDto> {
    return this.apiAdminService.getLastEntries();
  }
}
