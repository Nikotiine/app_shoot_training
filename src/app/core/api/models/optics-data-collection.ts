/* tslint:disable */
/* eslint-disable */
import { FactoryDto } from '../models/factory-dto';
import { OpticsBodyDiameterDto } from '../models/optics-body-diameter-dto';
import { OpticsFocalPlaneDto } from '../models/optics-focal-plane-dto';
import { OpticsOutletDiameterDto } from '../models/optics-outlet-diameter-dto';
import { OpticsUnitDto } from '../models/optics-unit-dto';
export interface OpticsDataCollection {
  opticsBodyDiameterList: Array<OpticsBodyDiameterDto>;
  opticsFactoryList: Array<FactoryDto>;
  opticsFocalPlaneList: Array<OpticsFocalPlaneDto>;
  opticsOutletDiameterList: Array<OpticsOutletDiameterDto>;
  opticsUnitList: Array<OpticsUnitDto>;
}
