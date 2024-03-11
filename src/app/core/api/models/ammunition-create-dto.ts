/* tslint:disable */
/* eslint-disable */
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
export interface AmmunitionCreateDto {
  ballisticCoefficient?: number;
  caliber: CaliberDto;
  factory: FactoryDto;
  initialSpeed?: number;
  name: string;
  weight: AmmunitionWeightDto;
}
