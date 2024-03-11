import { Injectable } from '@angular/core';
import { AmmunitionWeight } from '../enum/AmmunitionWeight.enum';
export interface WeightViewModel {
  id: number;
  label: string;
}
export interface GrainsAndGrams {
  grains: number;
  grams: number;
}
@Injectable({
  providedIn: 'root'
})
export class AmmunitionWeightService {
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
  constructor() {}

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
}
