import { inject, Injectable } from '@angular/core';
import { MapperOpticsService } from '../api-service-mapper/mapper-optics.service';
import { OpticsCreateDto } from '../../api/models/optics-create-dto';
import { Observable } from 'rxjs';
import { OpticsDto } from '../../api/models/optics-dto';
import { OpticsUnitDto } from '../../api/models/optics-unit-dto';
import { OpticsOutletDiameterDto } from '../../api/models/optics-outlet-diameter-dto';
import { OpticsFocalPlaneDto } from '../../api/models/optics-focal-plane-dto';
import { OpticsBodyDiameterDto } from '../../api/models/optics-body-diameter-dto';
import { MapperFactoryService } from '../api-service-mapper/mapper-factory.service';
import { FactoryDto } from '../../api/models/factory-dto';
import { FactoryType } from '../enum/FactoryType.enum';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class OpticsService {
  private readonly mapperOpticsService: MapperOpticsService =
    inject(MapperOpticsService);
  private readonly mapperFactoryService: MapperFactoryService =
    inject(MapperFactoryService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentServiceMessageHeader: string =
    'Gestion des optiques';
  public save(optics: OpticsCreateDto): Observable<OpticsDto> {
    return this.mapperOpticsService.save(optics);
  }
  public edit(optics: OpticsDto): Observable<OpticsDto> {
    return this.mapperOpticsService.edit(optics);
  }
  public disable(id: number): Observable<OpticsDto[]> {
    return this.mapperOpticsService.disable(id);
  }
  public getAllActives(): Observable<OpticsDto[]> {
    return this.mapperOpticsService.getAllActives();
  }
  public getAll(): Observable<OpticsDto[]> {
    return this.mapperOpticsService.getAll();
  }
  public getUnits(): Observable<OpticsUnitDto[]> {
    return this.mapperOpticsService.getOpticsUnits();
  }
  public getOutletDiameters(): Observable<OpticsOutletDiameterDto[]> {
    return this.mapperOpticsService.getOutletDiameters();
  }
  public getFocalPlanes(): Observable<OpticsFocalPlaneDto[]> {
    return this.mapperOpticsService.getOpticsFocalPlanes();
  }
  public getBodyDiameters(): Observable<OpticsBodyDiameterDto[]> {
    return this.mapperOpticsService.getBodyDiameters();
  }
  public getOpticsFactory(): Observable<FactoryDto[]> {
    return this.mapperFactoryService.getAllFactoryByType(FactoryType.OPTICS);
  }
  public successMessage(message: string): void {
    this.customMessageService.successMessage(
      this._currentServiceMessageHeader,
      message
    );
  }
  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentServiceMessageHeader,
      message
    );
  }
  public getCurrentServiceMessageHeader(): string {
    return this._currentServiceMessageHeader;
  }
}
