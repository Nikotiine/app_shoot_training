import { inject, Injectable } from '@angular/core';
import { ApiOpticsService } from '../../api/services/api-optics.service';
import { OpticsCreateDto } from '../../api/models/optics-create-dto';
import { Observable } from 'rxjs';
import { OpticsDto } from '../../api/models/optics-dto';
import { OpticsUnitDto } from '../../api/models/optics-unit-dto';
import { OpticsOutletDiameterDto } from '../../api/models/optics-outlet-diameter-dto';
import { OpticsBodyDiameterDto } from '../../api/models/optics-body-diameter-dto';
import { OpticsFocalPlaneDto } from '../../api/models/optics-focal-plane-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperOpticsService {
  private readonly apiOpticsService: ApiOpticsService =
    inject(ApiOpticsService);

  public save(optics: OpticsCreateDto): Observable<OpticsDto> {
    return this.apiOpticsService.newOptics({
      body: optics
    });
  }
  public edit(optics: OpticsDto): Observable<OpticsDto> {
    return this.apiOpticsService.editOptics({
      body: optics
    });
  }
  public getAllActives(): Observable<OpticsDto[]> {
    return this.apiOpticsService.getAllActiveOptics();
  }
  public getAll(): Observable<OpticsDto[]> {
    return this.apiOpticsService.getAllOptics();
  }
  public disable(id: number): Observable<OpticsDto[]> {
    return this.apiOpticsService.disableOptics({
      id: id
    });
  }
  public getOpticsUnits(): Observable<OpticsUnitDto[]> {
    return this.apiOpticsService.getOpticsUnits();
  }
  public getOutletDiameters(): Observable<OpticsOutletDiameterDto[]> {
    return this.apiOpticsService.getOpticsOutletDiameter();
  }
  public getBodyDiameters(): Observable<OpticsBodyDiameterDto[]> {
    return this.apiOpticsService.getOpticsBodyDiameter();
  }
  public getOpticsFocalPlanes(): Observable<OpticsFocalPlaneDto[]> {
    return this.apiOpticsService.getOpticsFocalPlane();
  }
}
