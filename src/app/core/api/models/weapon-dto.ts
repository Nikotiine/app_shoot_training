/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';
export interface WeaponDto {
  active?: boolean;
  barrelLength: number;
  barrelStripes?: number;
  caliber: CaliberDto;
  category: WeaponCategoryDto;
  createdAt?: string;
  factory: FactoryDto;
  heavyBarrel?: boolean;
  id: number;
  model: string;
  type: WeaponTypeDto;
  variation?: string;
}
