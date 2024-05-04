import { inject, Injectable } from '@angular/core';
import { MapperFactoryService } from '../api-service-mapper/mapper-factory.service';
import { Observable } from 'rxjs';
import { FactoryDto } from '../../api/models/factory-dto';
import { FactoryCreateDto } from '../../api/models/factory-create-dto';
import { FactoryType } from '../enum/FactoryType.enum';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  private readonly mapperFactoryService: MapperFactoryService =
    inject(MapperFactoryService);
  private readonly _currentServiceMessageHeader: string = 'Gestion des marques';
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  public save(factory: FactoryCreateDto): Observable<FactoryDto> {
    return this.mapperFactoryService.save(factory);
  }

  public edit(factory: FactoryDto): Observable<FactoryDto> {
    return this.mapperFactoryService.edit(factory);
  }

  public getFactoriesByType(type: FactoryType): Observable<FactoryDto[]> {
    return this.mapperFactoryService.getAllFactoryByType(type);
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
}
