import { inject, Injectable } from '@angular/core';
import { DropdownModel } from '../model/DropdownModel';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { AmmunitionDto } from '../../api/models/ammunition-dto';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownModelService {
  private readonly colorService: ColorService = inject(ColorService);
  /**
   * Transforme les setup de l'utlisateur UserWeaponSetupDto[] en DropdownModel[]
   * @param setups
   */
  public mapSetupToDropdownModel(
    setups: UserWeaponSetupDto[]
  ): DropdownModel[] {
    return setups.map((setup) => {
      return {
        id: setup.id,
        name: this.createSetupName(setup)
      };
    });
  }

  /**
   * Genere le nom du setup complet : Marque de l'arme / model + lunette associe avec zoom mini - maxi et diametre de
   * lentille exterieur UserWeaponSetupDto
   * @param setup
   */
  public createSetupName(setup: UserWeaponSetupDto): string {
    if (setup.weapon.type.type === 'RIFFLE') {
      return `${setup.weapon.factory.name}-${setup.weapon.model} + ${setup.optics?.factory.name}-${setup.optics?.name} ${setup.optics?.minZoom}-${setup.optics?.maxZoom}x${setup.optics?.outletDiameter.label}`;
    } else {
      return `${setup.weapon.factory.name}-${setup.weapon.model}`;
    }
  }

  /**
   * Transforme les munition utilisées par l'utilisateur AmmunitionDto[] en DropdownModel[]
   * @param ammunition
   */
  public mapAmmunitionToDropdownModel(
    ammunition: AmmunitionDto[]
  ): DropdownModel[] {
    return ammunition.map((ammo) => {
      return {
        id: ammo.id,
        name: this.createAmmunitionName(ammo)
      };
    });
  }

  /**
   * Genere le nom de la munition avec Marque / modele et poids en grains
   * @param ammo AmmunitionDto
   */
  public createAmmunitionName(ammo: AmmunitionDto): string {
    return `${ammo.factory.name} - ${ammo.name} / ${ammo.weight.grains} grains`;
  }

  /**
   * Transfome la liste des different distances faite par l'utilisateur lors de ses seance  en DropdownModel[]
   * @param distances
   */
  public mapDistanceToDropdownModel(distances: number[]): DropdownModel[] {
    const dropdown: DropdownModel[] = [];
    distances.forEach((distance, index) => {
      dropdown.push({
        id: index,
        name: distance.toString() + ' m',
        value: distance,
        severity: this.colorService.getDistanceSeverity(distance)
      });
    });
    return dropdown;
  }
}
