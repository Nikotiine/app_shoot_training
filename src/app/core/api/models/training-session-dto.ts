/* tslint:disable */
/* eslint-disable */
import { AmmunitionDto } from '../models/ammunition-dto';
import { TrainingSessionGroupDto } from '../models/training-session-group-dto';
import { UserWeaponSetupDto } from '../models/user-weapon-setup-dto';
export interface TrainingSessionDto {
  active: boolean;
  ammunition: AmmunitionDto;
  createdAt: string;
  date: string;
  distance?: number;
  id: number;
  position?: 'STANDING' | 'SEATED' | 'LYING' | 'KNEELING';
  pressure?: number;
  setup: UserWeaponSetupDto;
  support?: 'BAG' | 'BIPOD' | 'HAND';
  temperature?: number;
  trainingSessionGroups: Array<TrainingSessionGroupDto>;
  windSpeed?: number;
}
