/* tslint:disable */
/* eslint-disable */
import { AmmunitionWeightDto } from '../models/ammunition-weight-dto';
import { CaliberDto } from '../models/caliber-dto';
import { FactoryDto } from '../models/factory-dto';
export interface AmmunitionDto {
  active?: boolean;
  ballisticCoefficient?: number;
  caliber: CaliberDto;
  createdAt?: string;
  factory: FactoryDto;
  id: number;
  initialSpeed?: number;
  name: string;
  weight: AmmunitionWeightDto;
}
