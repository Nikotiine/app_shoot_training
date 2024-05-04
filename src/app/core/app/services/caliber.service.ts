import { inject, Injectable } from '@angular/core';
import { MapperCaliberService } from '../api-service-mapper/mapper-caliber.service';
import { CaliberCreateDto } from '../../api/models/caliber-create-dto';
import { Observable } from 'rxjs';
import { CaliberDto } from '../../api/models/caliber-dto';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class CaliberService {
  private readonly mapperCaliberService: MapperCaliberService =
    inject(MapperCaliberService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentPageMessageHeader: string = 'Gestion des calibres';
  public save(caliber: CaliberCreateDto): Observable<CaliberDto> {
    return this.mapperCaliberService.save(caliber);
  }

  public edit(caliber: CaliberDto): Observable<CaliberDto> {
    return this.mapperCaliberService.edit(caliber);
  }

  public getAll(): Observable<CaliberDto[]> {
    return this.mapperCaliberService.getAll();
  }
  public successMessage(message: string): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      message
    );
  }
  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentPageMessageHeader,
      message
    );
  }
}
