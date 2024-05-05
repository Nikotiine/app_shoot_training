import { inject, Injectable } from '@angular/core';
import { ApiAmmunitionService } from '../../api/services/api-ammunition.service';
import { AmmunitionCreateDto } from '../../api/models/ammunition-create-dto';
import { Observable } from 'rxjs';
import { AmmunitionDto } from '../../api/models/ammunition-dto';
import { AmmunitionWeightDto } from '../../api/models/ammunition-weight-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperAmmunitionService {
  private readonly apiAmmunitionService: ApiAmmunitionService =
    inject(ApiAmmunitionService);

  public save(ammuntion: AmmunitionCreateDto): Observable<AmmunitionDto> {
    return this.apiAmmunitionService.newAmmunition({
      body: ammuntion
    });
  }
  public edit(ammunition: AmmunitionDto): Observable<AmmunitionDto> {
    return this.apiAmmunitionService.editAmmunition({
      body: ammunition
    });
  }
  public getAll(): Observable<AmmunitionDto[]> {
    return this.apiAmmunitionService.getAllAmmunition();
  }
  public disable(id: number): Observable<AmmunitionDto[]> {
    return this.apiAmmunitionService.disableAmmunition({
      id: id
    });
  }
  public getAmmunitionByCaliber(id: number): Observable<AmmunitionDto[]> {
    return this.apiAmmunitionService.getAmmunitionByCaliber({
      id: id
    });
  }
}
