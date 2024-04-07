/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { WeaponDto } from '../models/weapon-dto';
export interface AmmunitionSpeedHistoryCreateDto {
  ammunition: AmmunitionDto;
  speed: number;
  weapon: WeaponDto;
}
