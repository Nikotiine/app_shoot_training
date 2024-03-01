/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';
export interface AdminDashboardDataInformation {
  lastAmmunitionEntry: AmmunitionDto;
  lastOpticEntry: OpticsDto;
  lastUserEntry: UserProfileDto;
  lastWeaponEntry: WeaponDto;
  totalAmmunition: number;
  totalOptics: number;
  totalUsers: number;
  totalWeapons: number;
}
