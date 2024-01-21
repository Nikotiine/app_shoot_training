/* tslint:disable */
/* eslint-disable */
import { Weapon } from '../models/weapon';
export interface WeaponType {
  active?: boolean;
  createdAT?: string;
  id?: number;
  type?: string;
  updatedAt?: string;
  weapons?: Array<Weapon>;
}
