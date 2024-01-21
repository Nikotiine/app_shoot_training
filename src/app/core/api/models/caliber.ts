/* tslint:disable */
/* eslint-disable */
import { Weapon } from '../models/weapon';
import { WeaponSoundReducer } from '../models/weapon-sound-reducer';
export interface Caliber {
  active?: boolean;
  caliber?: string;
  createdAT?: string;
  id?: number;
  soundReducers?: Array<WeaponSoundReducer>;
  updatedAt?: string;
  weapons?: Array<Weapon>;
}
