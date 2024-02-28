/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { CaliberDto } from '../models/caliber-dto';
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';
export interface AdminDashboardDataInformation {
  lastAmmunitionEntry: AmmunitionDto;
  lastCaliberEntry: CaliberDto;
  lastOpticEntry: OpticsDto;
  lastUserEntry: UserProfileDto;
  lastWeaponEntry: WeaponDto;
  totalAmmunition: number;
  totalCaliber: number;
  totalOptics: number;
  totalUsers: number;
  totalWeapons: number;
}
