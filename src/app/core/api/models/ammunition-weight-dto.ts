/* tslint:disable */
/* eslint-disable */
import { CaliberDto } from '../models/caliber-dto';
export interface AmmunitionWeightDto {
  active: boolean;
  calibers?: Array<CaliberDto>;
  createdAt: string;
  grains?: number;
  grams?: number;
  id: number;
}
