/* tslint:disable */
/* eslint-disable */
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';
import { WeaponSoundReducerDto } from '../models/weapon-sound-reducer-dto';
export interface UserWeaponSetupCreateDto {
  optics: OpticsDto;
  slopeRail?: number;
  soundReducer?: WeaponSoundReducerDto;
  user: UserProfileDto;
  weapon: WeaponDto;
}
