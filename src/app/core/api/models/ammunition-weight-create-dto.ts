/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
export interface AmmunitionWeightCreateDto {
  calibers: Array<CaliberDto>;
  grains: number;
  grams: number;
}
