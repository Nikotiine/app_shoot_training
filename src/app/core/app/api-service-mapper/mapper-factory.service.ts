import { inject, Injectable } from '@angular/core';
import { ApiFactoryService } from '../../api/services/api-factory.service';
import { FactoryType } from '../enum/FactoryType.enum';
import { Observable } from 'rxjs';
import { FactoryDto } from '../../api/models/factory-dto';
import { FactoryCreateDto } from '../../api/models/factory-create-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperFactoryService {
  private readonly apiFactoryService: ApiFactoryService =
    inject(ApiFactoryService);

  public getAllFactoryByType(type: FactoryType): Observable<FactoryDto[]> {
    return this.apiFactoryService.getAllFactoryByType({
      type: type
    });
  }

  public disableFactory(id: number): Observable<FactoryDto[]> {
    return this.apiFactoryService.disableFactory({
      id: id
    });
  }
  public save(factory: FactoryCreateDto): Observable<FactoryDto> {
    return this.apiFactoryService.saveFactory({
      body: factory
    });
  }
  public edit(factory: FactoryDto): Observable<FactoryDto> {
    return this.apiFactoryService.editFactory({
      body: factory
    });
  }
}
