/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { AmmunitionSpeedHistoryCreateDto } from '../models/ammunition-speed-history-create-dto';
import { UserWeaponSetupDto } from '../models/user-weapon-setup-dto';
export interface TrainingSessionDto {
  active: boolean;
  ammunition: AmmunitionDto;
  createdAt: string;
  date: string;
  distance?: number;
  id: number;
  setup: UserWeaponSetupDto;
  speedHistories?: Array<AmmunitionSpeedHistoryCreateDto>;
  temperature?: number;
  windSpeed?: number;
}
