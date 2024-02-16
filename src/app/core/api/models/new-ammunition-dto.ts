/* tslint:disable */
/* eslint-disable */
import { AmmunitionFactoryDto } from '../models/ammunition-factory-dto';
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { CaliberDto } from '../models/caliber-dto';
export interface NewAmmunitionDto {
  ballisticCoefficient?: number;
  caliber: CaliberDto;
  factory: AmmunitionFactoryDto;
  initialSpeed?: number;
  name: string;
  weight: AmmunitionWeightDto;
}
