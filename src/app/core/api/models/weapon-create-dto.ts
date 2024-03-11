/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';
export interface WeaponCreateDto {
  barrelLength: number;
  barrelStripes?: number;
  caliber: CaliberDto;
  category: WeaponCategoryDto;
  factory: FactoryDto;
  heavyBarrel?: boolean;
  model: string;
  type: WeaponTypeDto;
  variation?: string;
}
