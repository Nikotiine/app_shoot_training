/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';
export interface WeaponDataCollection {
  caliberList: Array<CaliberDto>;
  weaponCategoryList: Array<WeaponCategoryDto>;
  weaponFactoryList: Array<FactoryDto>;
  weaponTypeList: Array<WeaponTypeDto>;
}
