import { Injectable } from '@angular/core';
import { ShooterProfileDto } from '../../api/models/shooter-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class ShooterService {
  private shooter!: ShooterProfileDto;
  constructor() {}

  public setProfile(profile: ShooterProfileDto) {
    this.shooter = profile;
  }
}
