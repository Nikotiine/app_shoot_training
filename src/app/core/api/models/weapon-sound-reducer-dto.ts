/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { WeaponSoundReducerFactoryDto } from '../models/weapon-sound-reducer-factory-dto';
export interface WeaponSoundReducerDto {
  caliber: CaliberDto;
  diameter: number;
  factory?: WeaponSoundReducerFactoryDto;
  id: number;
  length: number;
  model: string;
  weight: number;
}
