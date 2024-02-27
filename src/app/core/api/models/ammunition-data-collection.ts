/* tslint:disable */
/* eslint-disable */
import { AmmunitionFactoryDto } from '../models/ammunition-factory-dto';
import { CaliberDto } from '../models/caliber-dto';
export interface AmmunitionDataCollection {
  caliberList: Array<CaliberDto>;
  factoryList: Array<AmmunitionFactoryDto>;
}
