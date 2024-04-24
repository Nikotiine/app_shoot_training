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
import {
  TrainingGroup,
  TrainingSessionTableViewModel,
  TrainingSessionViewModel
} from '../model/TrainingSessionViewModel.model';
import { TrainingSessionGroupDto } from '../../api/models/training-session-group-dto';
import { ColorService } from './color.service';

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
  private readonly colorService: ColorService = inject(ColorService);
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
        severity: this.colorService.getDistanceSeverity(distance)
      });
    });
    return dropdown;
  }

  /**
   * Map TrainingSessionDto[] en TrainingSessionTableViewModel[]
   * @param sessions TrainingSessionDto[]
   */
  public createTrainingSessionTableVM(
    sessions: TrainingSessionDto[]
  ): TrainingSessionTableViewModel[] {
    return sessions.map((session) => {
      return {
        id: session.id,
        distance: session.distance,
        distanceSeverity: this.colorService.getDistanceSeverity(
          session.distance
        ),
        setup: this.createSetupName(session.setup),
        position: this.getPositionLabel(session.position),
        date: new Date(session.date),
        ammunition: this.createAmmunitionName(session.ammunition)
      };
    });
  }

  /**
   * Map TrainingSessionDto en  TrainingSessionViewModel
   * @param session TrainingSessionDto
   */
  public createTrainingViewModel(
    session: TrainingSessionDto
  ): TrainingSessionViewModel {
    const bestScore: number = this.getBestScore(session.trainingSessionGroups);
    const bestAverage: number = this.getBestAverage(
      session.trainingSessionGroups
    );
    return {
      id: session.id,
      distance: session.distance,
      distanceSeverity: this.colorService.getDistanceSeverity(session.distance),
      setup: this.createSetupName(session.setup),
      position: this.getPositionLabel(session.position),
      date: new Date(session.date),
      ammunition: this.createAmmunitionName(session.ammunition),
      support: this.getSupportLabel(session.support),
      windSpeed: session.windSpeed,
      windSpeedTextColor: this.colorService.getWindSpeedColor(
        session.windSpeed
      ),
      pressure: session.pressure,
      bestScore: bestScore,
      bestScoreTextColor: this.colorService.getScoreColor(bestScore),
      bestAverageGap: bestAverage,
      groups: this.createSessionGroups(
        session.trainingSessionGroups,
        bestAverage
      )
    };
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
   * Retourne le label en fonction de la position de la session
   * @param positionApiEnum
   */
  private getPositionLabel(positionApiEnum: string | undefined): string {
    let position = '';
    switch (positionApiEnum) {
      case TrainingPosition.LYING:
        position = 'Couché';
        break;
      case TrainingPosition.SEATED:
        position = 'Assis';
        break;
      case TrainingPosition.KNEELING:
        position = 'A genoux';
        break;
      case TrainingPosition.STANDING:
        position = 'Debout';
        break;
      default:
        position = TrainingPosition.STANDING;
    }
    return position;
  }

  /**
   * Retourne le label en fontion du spport de la sesion utilise
   * @param supportApiEnum
   */
  private getSupportLabel(supportApiEnum: string | undefined): string {
    let supportLabel = '';
    switch (supportApiEnum) {
      case WeaponSupport.BIPOD:
        supportLabel = 'Bipied';
        break;
      case WeaponSupport.BAG:
        supportLabel = 'Sac de tir';
        break;
      case WeaponSupport.HAND:
        supportLabel = 'Bras francs';
        break;
    }
    return supportLabel;
  }

  /**
   * Compare et retourne le meuilleur score
   * @param trainingSessionGroups TrainingSessionGroupDto[]
   */
  private getBestScore(
    trainingSessionGroups: TrainingSessionGroupDto[]
  ): number {
    let score: number = 0;
    for (const sessionGroup of trainingSessionGroups) {
      if (sessionGroup.score && score < sessionGroup.score) {
        score = sessionGroup.score;
      }
      if (sessionGroup.totalShoots != 0) {
        score = (score * 10) / sessionGroup.totalShoots;
      }
    }
    return score;
  }

  /**
   * Genere le traningGroupViewModel et attribue les couleur des score et des groupement
   * @param trainingSessionGroups TrainingSessionGroupDto[]
   * @param bestAverageGap number le meuilleur groupement de toute les enregistrement de la session
   * permet de comparer les different groupement et attribue une couleur en fontion d'un % d'ecart
   */
  private createSessionGroups(
    trainingSessionGroups: TrainingSessionGroupDto[],
    bestAverageGap: number
  ): TrainingGroup[] {
    return trainingSessionGroups.map((group) => {
      let averageGap = 0;
      if (group.horizontalGap && group.verticalGap) {
        averageGap = group.horizontalGap + group.verticalGap;
      }
      return {
        score: group.score,
        horizontalGap: group.horizontalGap,
        verticalGap: group.verticalGap,
        averageGap: averageGap,
        scoreColor: this.colorService.getScoreColor(group.score),
        totalShoots: group.totalShoots,
        averageGapColor: this.colorService.getAverageGapColor(
          bestAverageGap,
          averageGap
        )
      };
    });
  }

  /**
   * Compare et reourne le meuilleur groupement de la session
   * @param trainingSessionGroups TrainingSessionGroupDto[]
   */
  private getBestAverage(
    trainingSessionGroups: TrainingSessionGroupDto[]
  ): number {
    let averageGap = null;
    for (const session of trainingSessionGroups) {
      if (session.verticalGap && session.horizontalGap) {
        const average = session.verticalGap + session.horizontalGap;
        if (averageGap === null) {
          averageGap = average;
        } else if (averageGap > average) {
          averageGap = average;
        }
      }
    }
    return averageGap ? averageGap : 0;
  }
}
