import { inject, Injectable } from '@angular/core';
import { ApiAmmunitionWeightService } from '../../api/services/api-ammunition-weight.service';
import { AmmunitionWeightCreateDto } from '../../api/models/ammunition-weight-create-dto';
import { Observable } from 'rxjs';
import { AmmunitionWeightDto } from '../../api/models/ammunition-weight-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperAmmunitionWeightService {
  private readonly apiAmmunitionWeightService: ApiAmmunitionWeightService =
    inject(ApiAmmunitionWeightService);

  public save(
    weight: AmmunitionWeightCreateDto
  ): Observable<AmmunitionWeightDto> {
    return this.apiAmmunitionWeightService.newWeight({
      body: weight
    });
  }

  public edit(weight: AmmunitionWeightDto): Observable<AmmunitionWeightDto> {
    return this.apiAmmunitionWeightService.editWeight({
      body: weight
    });
  }

  public disable(id: number): Observable<AmmunitionWeightDto[]> {
    return this.apiAmmunitionWeightService.disableAmmunitionWeight({
      id: id
    });
  }

  public getAll(): Observable<AmmunitionWeightDto[]> {
    return this.apiAmmunitionWeightService.getAllWeight();
  }

  public getWeightByCaliber(id: number): Observable<AmmunitionWeightDto[]> {
    return this.apiAmmunitionWeightService.getWeightByCaliber({
      id: id
    });
  }
}
