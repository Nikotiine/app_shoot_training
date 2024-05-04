import { inject, Injectable } from '@angular/core';
import { ApiCaliberService } from '../../api/services/api-caliber.service';
import { Observable } from 'rxjs';
import { CaliberDto } from '../../api/models/caliber-dto';
import { CaliberCreateDto } from '../../api/models/caliber-create-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperCaliberService {
  private readonly apiCaliberService: ApiCaliberService =
    inject(ApiCaliberService);

  public getAll(): Observable<CaliberDto[]> {
    return this.apiCaliberService.getAllCalibers();
  }

  public save(caliber: CaliberCreateDto): Observable<CaliberDto> {
    return this.apiCaliberService.saveCaliber({
      body: caliber
    });
  }

  public edit(caliber: CaliberDto): Observable<CaliberDto> {
    return this.apiCaliberService.editCaliber({
      body: caliber
    });
  }
}
