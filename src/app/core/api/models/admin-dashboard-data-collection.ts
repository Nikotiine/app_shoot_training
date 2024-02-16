/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { OpticsDto } from '../models/optics-dto';
import { UserProfileDto } from '../models/user-profile-dto';
import { WeaponDto } from '../models/weapon-dto';
export interface AdminDashboardDataCollection {
  ammunitionList: Array<AmmunitionDto>;
  opticsList: Array<OpticsDto>;
  userProfileList: Array<UserProfileDto>;
  weaponList: Array<WeaponDto>;
}
