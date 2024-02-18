/* tslint:disable */
/* eslint-disable */
import { AmmunitionFactoryDto } from '../models/ammunition-factory-dto';
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { CaliberDto } from '../models/caliber-dto';
export interface AmmunitionDto {
  active?: boolean;
  ballisticCoefficient?: number;
  caliber: CaliberDto;
  createdAT?: string;
  factory: AmmunitionFactoryDto;
  id: number;
  initialSpeed?: number;
  name: string;
  weight: AmmunitionWeightDto;
}
