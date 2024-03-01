/* tslint:disable */
/* eslint-disable */
import { FactoryDto } from '../models/factory-dto';
import { OpticsBodyDiameterDto } from '../models/optics-body-diameter-dto';
import { OpticsFocalPlaneDto } from '../models/optics-focal-plane-dto';
import { OpticsOutletDiameterDto } from '../models/optics-outlet-diameter-dto';
import { OpticsUnitDto } from '../models/optics-unit-dto';
export interface NewOpticsDto {
  bodyDiameter: OpticsBodyDiameterDto;
  factory: FactoryDto;
  focalPlane: OpticsFocalPlaneDto;
  maxDerivation: number;
  maxElevation: number;
  maxZoom: number;
  minParallax: number;
  minZoom: number;
  name: string;
  opticsUnit: OpticsUnitDto;
  outletDiameter: OpticsOutletDiameterDto;
  parallax?: boolean;
  valueOfOneClick: number;
}
