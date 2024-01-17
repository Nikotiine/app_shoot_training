import { Injectable } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private shooter!: UserProfileDto;

  public setProfile(profile: UserProfileDto) {
    this.shooter = profile;
  }

  public getProfile(): UserProfileDto {
    return this.shooter;
  }
}
