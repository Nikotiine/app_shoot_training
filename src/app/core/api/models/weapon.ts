/* tslint:disable */
/* eslint-disable */
import { Caliber } from '../models/caliber';
import { WeaponCategory } from '../models/weapon-category';
import { WeaponFactory } from '../models/weapon-factory';
import { WeaponType } from '../models/weapon-type';
export interface Weapon {
  active?: boolean;
  barrelLength?: number;
  barrelStripes?: number;
  caliber?: Caliber;
  category?: WeaponCategory;
  createdAT?: string;
  factory?: WeaponFactory;
  heavyBarrel?: boolean;
  id?: number;
  model?: string;
  type?: WeaponType;
  updatedAt?: string;
  variation?: string;
}
