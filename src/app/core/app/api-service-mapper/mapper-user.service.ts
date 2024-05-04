import { inject, Injectable } from '@angular/core';
import { ApiUserService } from '../../api/services/api-user.service';
import { UserEditDto } from '../../api/models/user-edit-dto';
import { Observable } from 'rxjs';
import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperUserService {
  private readonly apiUserService: ApiUserService = inject(ApiUserService);

  public edit(profile: UserEditDto): Observable<UserProfileDto> {
    return this.apiUserService.editProfile({
      body: profile
    });
  }
}
