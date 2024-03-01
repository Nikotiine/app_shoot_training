/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
export interface WeaponSoundReducerDto {
  caliber: CaliberDto;
  diameter: number;
  factory?: FactoryDto;
  id: number;
  length: number;
  model: string;
  weight: number;
}
