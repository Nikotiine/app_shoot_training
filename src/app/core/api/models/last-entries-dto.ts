/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';
export interface LastEntriesDto {
  lastAmmunition: AmmunitionDto;
  lastOptics: OpticsDto;
  lastUser: UserProfileDto;
  lastWeapon: WeaponDto;
}
