/* tslint:disable */
/* eslint-disable */
import { Weapon } from '../models/weapon';
export interface WeaponFactory {
  active?: boolean;
  createdAT?: string;
  id?: number;
  name?: string;
  updatedAt?: string;
  weapons?: Array<Weapon>;
}
