/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { AmmunitionSpeedHistoryCreateDto } from '../models/ammunition-speed-history-create-dto';
import { UserWeaponSetupDto } from '../models/user-weapon-setup-dto';
export interface TrainingSessionCreateDto {
  ammunition: AmmunitionDto;
  date: string;
  distance?: number;
  setup: UserWeaponSetupDto;
  speedHistories?: Array<AmmunitionSpeedHistoryCreateDto>;
  temperature?: number;
  windSpeed?: number;
}
