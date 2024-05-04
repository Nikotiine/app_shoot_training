import { inject, Injectable } from '@angular/core';
import { AmmunitionWeight } from '../enum/AmmunitionWeight.enum';
import { WeightViewModel } from '../model/WeightViewModel';
import { AmmunitionWeightDto } from '../../api/models/ammunition-weight-dto';
import { Observable } from 'rxjs';
import { AmmunitionWeightCreateDto } from '../../api/models/ammunition-weight-create-dto';
import { MapperCaliberService } from '../api-service-mapper/mapper-caliber.service';
import { CaliberDto } from '../../api/models/caliber-dto';
import { MapperAmmunitionWeightService } from '../api-service-mapper/mapper-ammunition-weight.service';
import { UtilsAmmunitionWeightService } from './utils-ammunition-weight.service';
import { CustomMessageService } from './custom-message.service';

export interface GrainsAndGrams {
  grains: number;
  grams: number;
}
@Injectable({
  providedIn: 'root'
})
export class WeightService {
  private _typeOfWeight: WeightViewModel[] = [
    {
      id: 1,
      label: AmmunitionWeight.GRAM
    },
    {
      id: 2,
      label: AmmunitionWeight.GRAIN
    }
  ];
  private readonly mapperAmmunitionWeightService: MapperAmmunitionWeightService =
    inject(MapperAmmunitionWeightService);
  private readonly mapperCaliberService: MapperCaliberService =
    inject(MapperCaliberService);
  private utilsAmmunitionWeightService: UtilsAmmunitionWeightService = inject(
    UtilsAmmunitionWeightService
  );
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private _currentServiceMessageHeader: string = "Gestion des poids d'ogive";
  public getTypesOfWeight(): WeightViewModel[] {
    return this._typeOfWeight;
  }

  public convert(weight: number, type: AmmunitionWeight): GrainsAndGrams {
    let grams: number = 0;
    let grains: number = 0;
    if (type === AmmunitionWeight.GRAIN) {
      grains = weight;
      grams = this.convertGrainToGramme(weight);
    } else {
      grams = weight;
      grains = this.convertGramToGrain(weight);
    }
    return {
      grains: Math.round(grains),
      grams: grams
    };
  }

  /**
   * Converti les grain en grammes suivant la convertion 1 grain =  0.06479891 granmes
   * @param grain le poid en grain
   */
  private convertGrainToGramme(grain: number): number {
    return grain * 0.06479891;
  }

  private convertGramToGrain(gram: number) {
    return gram / 0.06479891;
  }

  /**
   * Creer le view model pour le drop down des poids predifini suivant le calibre
   * Afficher le poind en grains et le poids en gramme
   * @param weights AmmunitionWeightDto[]
   */
  public createWeightVM(weights: AmmunitionWeightDto[]): WeightViewModel[] {
    return this.utilsAmmunitionWeightService.createWeightVM(weights);
  }

  public getAllWeight(): Observable<AmmunitionWeightDto[]> {
    return this.mapperAmmunitionWeightService.getAll();
  }

  public getWeightByCaliber(
    caliberId: number
  ): Observable<AmmunitionWeightDto[]> {
    return this.mapperAmmunitionWeightService.getWeightByCaliber(caliberId);
  }

  public disableWeight(id: number): Observable<AmmunitionWeightDto[]> {
    return this.mapperAmmunitionWeightService.disable(id);
  }

  public create(
    weight: AmmunitionWeightCreateDto
  ): Observable<AmmunitionWeightDto> {
    return this.mapperAmmunitionWeightService.save(weight);
  }

  public edit(weight: AmmunitionWeightDto): Observable<AmmunitionWeightDto> {
    return this.mapperAmmunitionWeightService.edit(weight);
  }

  public getAllCalibers(): Observable<CaliberDto[]> {
    return this.mapperCaliberService.getAll();
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
  public warningMessage(message: string): void {
    this.customMessageService.warningMessage(
      this._currentServiceMessageHeader,
      message
    );
  }
  public getCurrentMessageHeader(): string {
    return this._currentServiceMessageHeader;
  }
}
