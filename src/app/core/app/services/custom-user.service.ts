import { Injectable, signal } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomUserService {
  private shooter: UserProfileDto | null = null;
  public isAdmin = signal(false);

  public setProfile(profile: UserProfileDto | null) {
    if (profile) {
      this.shooter = profile;
      this.isAdmin.set(this.shooter.role === 'ADMIN');
    } else {
      this.shooter = null;
      this.isAdmin.set(false);
    }
  }

  public getProfile(): UserProfileDto | null {
    if (this.shooter) {
      return this.shooter;
    }
    return null;
  }
}
