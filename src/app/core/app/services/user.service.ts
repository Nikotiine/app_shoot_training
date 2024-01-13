import { Injectable } from '@angular/core';
import { ShooterProfileDto } from '../../api/models/shooter-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private shooter!: ShooterProfileDto;

  public setProfile(profile: ShooterProfileDto) {
    this.shooter = profile;
  }

  public getProfile(): ShooterProfileDto {
    return this.shooter;
  }
}
