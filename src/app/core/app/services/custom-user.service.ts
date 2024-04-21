import { Injectable, signal } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomUserService {
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
}
