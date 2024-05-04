import { Injectable } from '@angular/core';
import { AmmunitionWeightDto } from '../../api/models/ammunition-weight-dto';
import { WeightViewModel } from '../model/WeightViewModel';

@Injectable({
  providedIn: 'root'
})
export class UtilsAmmunitionWeightService {
  /**
   * Creer le view model pour le drop down des poids predifini suivant le calibre
   * Afficher le poind en grains et le poids en gramme
   * @param weights AmmunitionWeightDto[]
   */
  public createWeightVM(weights: AmmunitionWeightDto[]): WeightViewModel[] {
    return weights.map((weight) => {
      return {
        id: weight.id,
        label: `${weight.grains} grains - ${weight.grams?.toFixed(2)} grammes`
      };
    });
  }
}
