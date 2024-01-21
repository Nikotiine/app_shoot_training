/* tslint:disable */
/* eslint-disable */
import { Weapon } from '../models/weapon';
export interface WeaponCategory {
  active?: boolean;
  category?: string;
  createdAT?: string;
  id?: number;
  updatedAt?: string;
  weapons?: Array<Weapon>;
}
