import { inject, Injectable, signal } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';
import { UserEditDto } from '../../api/models/user-edit-dto';
import { MapperUserService } from '../api-service-mapper/mapper-user.service';
import { Observable } from 'rxjs';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly mapperUserService: MapperUserService =
    inject(MapperUserService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentPageMessageHeader: string =
    'Gestion du compte utilisateur';
  private user: UserProfileDto | null = null;
  public isAdmin = signal(false);

  public setProfile(profile: UserProfileDto | null) {
    if (profile) {
      this.user = profile;
      this.isAdmin.set(this.user.role === 'ADMIN');
    } else {
      this.user = null;
      this.isAdmin.set(false);
    }
  }

  public getProfile(): UserProfileDto | null {
    if (this.user) {
      return this.user;
    }
    return null;
  }

  public editProfile(profile: UserEditDto): Observable<UserProfileDto> {
    return this.mapperUserService.edit(profile);
  }

  public successMessage(message: string): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      message
    );
  }
  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentPageMessageHeader,
      message
    );
  }
}
