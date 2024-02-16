import { Injectable, signal } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private shooter!: UserProfileDto;
  public isAdmin = signal(false);

  public setProfile(profile: UserProfileDto) {
    this.shooter = profile;
    console.log(this.shooter.role === 'ADMIN');
    this.isAdmin.set(this.shooter.role === 'ADMIN');
  }

  public getProfile(): UserProfileDto {
    return this.shooter;
  }
}
