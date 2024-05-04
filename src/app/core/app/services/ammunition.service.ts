import { inject, Injectable } from '@angular/core';
import { MapperAmminitionService } from '../api-service-mapper/mapper-amminition.service';
import { AmmunitionCreateDto } from '../../api/models/ammunition-create-dto';
import { Observable } from 'rxjs';
import { AmmunitionDto } from '../../api/models/ammunition-dto';
import { MapperFactoryService } from '../api-service-mapper/mapper-factory.service';
import { FactoryDto } from '../../api/models/factory-dto';
import { FactoryType } from '../enum/FactoryType.enum';
import { MapperCaliberService } from '../api-service-mapper/mapper-caliber.service';
import { CaliberDto } from '../../api/models/caliber-dto';
import { CustomMessageService } from './custom-message.service';
import { MapperAmmunitionWeightService } from '../api-service-mapper/mapper-ammunition-weight.service';
import { AmmunitionWeightDto } from '../../api/models/ammunition-weight-dto';
import { ColorService } from './color.service';
import { UtilsAmmunitionWeightService } from './utils-ammunition-weight.service';
import { WeightViewModel } from '../model/WeightViewModel';

@Injectable({
  providedIn: 'root'
})
export class AmmunitionService {
  //************************************ MAPPERS ************************************
  private readonly mapperAmmunitionService: MapperAmminitionService = inject(
    MapperAmminitionService
  );
  private readonly mapperFactoryService: MapperFactoryService =
    inject(MapperFactoryService);
  private readonly mapperCaliberService: MapperCaliberService =
    inject(MapperCaliberService);
  private readonly mapperAmmunitionWeightService: MapperAmmunitionWeightService =
    inject(MapperAmmunitionWeightService);
  //************************************ UTILS SERVICE ************************************
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly utilsAmmunitionWeightService: UtilsAmmunitionWeightService =
    inject(UtilsAmmunitionWeightService);

  //************************************ GESTION DES MESSAGES ************************************
  private readonly _currentServiceMessageHeader: string =
    'Gestion des munitions';
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

  // Methodes du mapper
  public save(ammunition: AmmunitionCreateDto): Observable<AmmunitionDto> {
    return this.mapperAmmunitionService.save(ammunition);
  }
  public edit(ammunition: AmmunitionDto): Observable<AmmunitionDto> {
    return this.mapperAmmunitionService.edit(ammunition);
  }
  public disable(id: number): Observable<AmmunitionDto[]> {
    return this.mapperAmmunitionService.disable(id);
  }
  public getAll(): Observable<AmmunitionDto[]> {
    return this.mapperAmmunitionService.getAll();
  }

  /**
   * Retourne les factories des munitions
   */
  public getFactories(): Observable<FactoryDto[]> {
    return this.mapperFactoryService.getAllFactoryByType(
      FactoryType.AMMUNITION
    );
  }

  /**
   * Retoune les calibres
   */
  public getAllCalibers(): Observable<CaliberDto[]> {
    return this.mapperCaliberService.getAll();
  }

  /**
   * Retroune les poids des muntion en focntion du calibre choisi
   * @param caliberId
   */
  public getWeightByCaliber(
    caliberId: number
  ): Observable<AmmunitionWeightDto[]> {
    return this.mapperAmmunitionWeightService.getWeightByCaliber(caliberId);
  }

  /**
   * Creer le WM des poids de munitions
   * @param weights
   */
  public createWeightVM(weights: AmmunitionWeightDto[]): WeightViewModel[] {
    return this.utilsAmmunitionWeightService.createWeightVM(weights);
  }

  public getCurrentMessageHeader(): string {
    return this._currentServiceMessageHeader;
  }
}
