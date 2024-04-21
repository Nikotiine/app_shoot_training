import { inject, Injectable } from '@angular/core';
import { WeaponSetupService } from '../../api/services/weapon-setup.service';
import { AmmunitionService } from '../../api/services/ammunition.service';
import { Observable } from 'rxjs';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { AmmunitionDto } from '../../api/models/ammunition-dto';
import { TrainingSessionCreateDto } from '../../api/models/training-session-create-dto';
import { TrainingSessionDto } from '../../api/models/training-session-dto';
import { CustomMessageService } from './custom-message.service';
import { TrainingPosition, WeaponSupport } from '../enum/TrainingSession.enum';
import { DropdownModel } from '../model/DropdownModel';
import { MapperTrainingSessionService } from '../api-service-mapper/mapper-training-session.service';
import { TrainingSessionViewModel } from '../model/TrainingSessionViewModel.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  // Private field
  private readonly mapperTrainingSessionService: MapperTrainingSessionService =
    inject(MapperTrainingSessionService);
  private readonly userSetupService: WeaponSetupService =
    inject(WeaponSetupService);
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentPageMessageHeader: string = 'Gestion des sesssion';

  public getUserSetups(id: number): Observable<UserWeaponSetupDto[]> {
    return this.userSetupService.getAllUserWeaponSetup({
      id: id
    });
  }

  public getAmmunitionByCaliber(id: number): Observable<AmmunitionDto[]> {
    return this.ammunitionService.getAmmunitionByCaliber({
      id: id
    });
  }

  public saveTrainingSession(
    trainingSession: TrainingSessionCreateDto
  ): Observable<TrainingSessionDto> {
    return this.mapperTrainingSessionService.createTrainingSession(
      trainingSession
    );
  }

  public getTrainingSessionById(id: number): Observable<TrainingSessionDto[]> {
    return this.mapperTrainingSessionService.getAllSessionByUser(id);
  }

  // ***************** Affichage des different message de la page ************
  public successCreateMessage(): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      'Session Ajoutée'
    );
  }

  public successUpdateMessage(): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      'Session Modifie'
    );
  }

  public savedForm(header: string): void {
    this.customMessageService.infoMessage(header, 'Donnée enregistrées');
  }

  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentPageMessageHeader,
      message
    );
  }

  /**
   * Retourne le Dropdown des position de tir
   */
  public getTrainingPositions(): DropdownModel[] {
    return [
      {
        id: 1,
        name: 'Debout',
        apiEnum: TrainingPosition.STANDING
      },
      {
        id: 2,
        name: 'A genoux',
        apiEnum: TrainingPosition.KNEELING
      },
      {
        id: 3,
        name: 'Assis',
        apiEnum: TrainingPosition.SEATED
      },
      {
        id: 4,
        name: 'Couché',
        apiEnum: TrainingPosition.LYING
      }
    ];
  }

  /**
   * Retourne le Dropdown des support de tir
   */
  public getWeaponSupports(): DropdownModel[] {
    return [
      {
        id: 1,
        name: 'Sac de tir',
        apiEnum: WeaponSupport.BAG
      },
      {
        id: 2,
        name: 'Bipied',
        apiEnum: WeaponSupport.BIPOD
      },
      {
        id: 3,
        name: 'Bras franc',
        apiEnum: WeaponSupport.HAND
      }
    ];
  }

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
   * Transfome la liste des different distances faite par l'utilisateur lors de ses seance  en DropdownModel[]
   * @param distances
   */
  public mapDistanceToDropdownModel(distances: number[]): DropdownModel[] {
    const dropdown: DropdownModel[] = [];
    distances.forEach((distance, index) => {
      dropdown.push({
        id: index,
        name: distance.toString(),
        value: distance,
        severity: this.getDistanceSeverity(distance)
      });
    });
    return dropdown;
  }

  public createTrainingSessionViewModel(
    sessions: TrainingSessionDto[]
  ): TrainingSessionViewModel[] {
    return sessions.map((session) => {
      return {
        id: session.id,
        distance: session.distance,
        distanceSeverity: this.getDistanceSeverity(session.distance),
        setup: this.createSetupName(session.setup),
        position: this.getTrainingPositions().find(
          (po) => po.apiEnum === session.position
        )?.name,
        date: new Date(session.date),
        ammunition: this.createAmmunitionName(session.ammunition)
      };
    });
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Genere le nom du setup complet : Marque de l'arme / model + lunette associe avec zoom mini - maxi et diametre de
   * lentille exterieur UserWeaponSetupDto
   * @param setup
   */
  private createSetupName(setup: UserWeaponSetupDto): string {
    return `${setup.weapon.factory.name}-${setup.weapon.model} + ${setup.optics.factory.name}-${setup.optics.name} ${setup.optics.minZoom}-${setup.optics.maxZoom}x${setup.optics.outletDiameter.label}`;
  }

  /**
   * Genere le nom de la munition avec Marque / modele et poids en grains
   * @param ammo AmmunitionDto
   */
  private createAmmunitionName(ammo: AmmunitionDto): string {
    return `${ammo.factory.name} - ${ammo.name} / ${ammo.weight.grains} grains`;
  }

  /**
   * Retroune la couleur des tag pour les diffente distance
   * @param distance
   * @private
   */
  private getDistanceSeverity(distance: number | undefined): string {
    let severity: string = '';
    if (distance) {
      if (distance > 1 && distance < 49) {
        severity = 'info';
      } else if (distance < 149) {
        severity = 'primary';
      } else if (distance < 299) {
        severity = 'warning';
      } else {
        severity = 'danger';
      }
    }
    return severity;
  }
}
