/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponFactoryDto } from '../models/weapon-factory-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';
export interface WeaponDto {
  active?: boolean;
  barrelLength: number;
  barrelStripes?: number;
  caliber: CaliberDto;
  category: WeaponCategoryDto;
  factory: WeaponFactoryDto;
  heavyBarrel?: boolean;
  id: number;
  model: string;
  type: WeaponTypeDto;
  variation?: string;
}
