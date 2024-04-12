/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { AmmunitionSpeedHistoryCreateDto } from '../models/ammunition-speed-history-create-dto';
import { TrainingSessionGroupCreateDto } from '../models/training-session-group-create-dto';
import { UserWeaponSetupDto } from '../models/user-weapon-setup-dto';
export interface TrainingSessionCreateDto {
  ammunition: AmmunitionDto;
  date: string;
  distance?: number;
  position?: 'STANDING' | 'SEATED' | 'LYING' | 'KNEELING';
  pressure?: number;
  setup: UserWeaponSetupDto;
  speedHistories?: Array<AmmunitionSpeedHistoryCreateDto>;
  support?: 'BAG' | 'BIPOD' | 'HAND';
  temperature?: number;
  trainingSessionGroups?: Array<TrainingSessionGroupCreateDto>;
  windSpeed?: number;
}
