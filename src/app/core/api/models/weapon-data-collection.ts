/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
import { WeaponCategoryDto } from '../models/weapon-category-dto';
import { WeaponFactoryDto } from '../models/weapon-factory-dto';
import { WeaponTypeDto } from '../models/weapon-type-dto';
export interface WeaponDataCollection {
  caliberList: Array<CaliberDto>;
  weaponCategoryList: Array<WeaponCategoryDto>;
  weaponFactoryList: Array<WeaponFactoryDto>;
  weaponTypeList: Array<WeaponTypeDto>;
}
