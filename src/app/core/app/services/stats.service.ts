import { inject, Injectable } from '@angular/core';
import { MapperTrainingSessionService } from '../api-service-mapper/mapper-training-session.service';
import { Observable } from 'rxjs';
import { TrainingSessionDto } from '../../api/models/training-session-dto';
import { CustomMessageService } from './custom-message.service';
import { TrainingSessionGroupByMouthDto } from '../../api/models/training-session-group-by-mouth-dto';

import {
  ActiveElement,
  Chart,
  ChartData,
  ChartEvent,
  ChartOptions
} from 'chart.js';
import { TrainingSessionGroupByMouthViewModel } from '../model/TrainingSessionGroupByMouthViewModel';
import { TrainingService } from './training.service';
import { DateService } from './date.service';
import { ScoreService } from './score.service';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { DropdownModelService } from './dropdown-model.service';
import { DropdownModel } from '../model/DropdownModel';
import { AmmunitionDto } from '../../api/models/ammunition-dto';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Private field
  private readonly mapperTrainingSessionService: MapperTrainingSessionService =
    inject(MapperTrainingSessionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly dropdownModelService: DropdownModelService =
    inject(DropdownModelService);
  private readonly scoreService: ScoreService = inject(ScoreService);
  private readonly dateService: DateService = inject(DateService);
  private readonly _currentPageMessageHeader: string =
    'Gestion des statistiques';

  /**
   * Retroune toutes les sessions de l'utlisateur connecté
   * @param id de l utilisateur
   */
  public getActiveTrainingSessionById(
    id: number
  ): Observable<TrainingSessionDto[]> {
    return this.mapperTrainingSessionService.getAllActiveSessionByUser(id);
  }

  // Message d'erreur
  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentPageMessageHeader,
      message
    );
  }

  public getTrainingSessionGroupByMouth(
    id: number,
    year: number
  ): Observable<TrainingSessionGroupByMouthDto> {
    return this.mapperTrainingSessionService.getTrainingSessionByUserIdGroupByMouthOrderASC(
      id,
      year
    );
  }

  public getMonthNameWithIndex(index: number): string {
    return this.dateService.getMonthNameWithIndex(index);
  }

  public getMonths(): string[] {
    return this.dateService.getMonths();
  }

  public createTrainingSessionGroupByMouthViewModel(
    trainingSessionGroupByMouth: TrainingSessionGroupByMouthDto
  ): TrainingSessionGroupByMouthViewModel[] {
    const result: TrainingSessionGroupByMouthViewModel[] = [];
    for (let i = 0; i < 12; i++) {
      const wm: TrainingSessionGroupByMouthViewModel = {
        month: this.getMonthNameWithIndex(i),
        trainingSessions: []
      };
      for (const key in trainingSessionGroupByMouth.groupByMouth) {
        if (i === Number(key)) {
          wm.trainingSessions = trainingSessionGroupByMouth.groupByMouth[key];
        }
      }
      result.push(wm);
    }
    return result;
  }

  public getChartData(data: TrainingSessionGroupByMouthViewModel[]): ChartData {
    return {
      labels: data.map((d) => d.month),
      datasets: [
        {
          type: 'bar',
          label: 'Nombre de seances',
          backgroundColor: '#296696',
          borderColor: '#296696',
          data: data.map((d) => d.trainingSessions.length)
        },
        {
          type: 'bubble',
          // fill: false,
          //  tension: 0.4,
          label: 'Meilleur score du mois',
          backgroundColor: '#1ABC9C',
          borderColor: '#1ABC9C',
          data: this.getBestScore(data).map((score) => {
            return {
              x: score != 0 ? 50 : 0,
              y: score,
              r: score != 0 ? 10 : 0
            };
          })
        },
        {
          type: 'bar',
          // fill: false,
          //  tension: 0.4,
          label: 'Meilleur groupement du mois',
          backgroundColor: '#E67E22',
          borderColor: '#E67E22',
          data: this.getBestAverage(data)
        }
      ]
    };
  }

  getOptions(): ChartOptions {
    return {
      onResize(chart: Chart, size: { width: number; height: number }): void {},
      onHover(
        event: ChartEvent,
        elements: ActiveElement[],
        chart: Chart
      ): void {},

      maintainAspectRatio: false,
      aspectRatio: 0.8,
      interaction: {
        mode: 'index',
        axis: 'y'
      },
      plugins: {
        title: {
          display: true,
          text: "Statistiques de l'année"
        },
        legend: {
          display: true,
          labels: {
            color: 'blue'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'teal',
            font: {
              weight: 500
            }
          },
          grid: {
            color: 'silver'
          }
        },
        y: {
          max: 100,
          ticks: {
            color: 'red'
          },
          grid: {
            color: 'silver'
          }
        }
      }
    };
  }

  private getBestScore(data: TrainingSessionGroupByMouthViewModel[]): number[] {
    const bestScores: number[] = [];

    for (const mouthSession of data) {
      let score: number = 0;
      if (mouthSession.trainingSessions.length > 0) {
        score = this.getBestScoreInTheMouth(mouthSession.trainingSessions);
      }
      bestScores.push(score);
    }
    return bestScores;
  }
  private getBestScoreInTheMouth(sessions: TrainingSessionDto[]): number {
    let result: number = 0;
    for (const session of sessions) {
      if (session.trainingSessionGroups.length > 0) {
        result = this.scoreService.getBestScore(session.trainingSessionGroups);
      }
    }
    return result;
  }
  private getBestAverage(
    data: TrainingSessionGroupByMouthViewModel[]
  ): number[] {
    const averages: number[] = [];
    for (const sessions of data) {
      let average: number = 0;
      if (sessions.trainingSessions.length > 0) {
        average = this.getBestAverageInTheMouth(sessions.trainingSessions);
      }
      averages.push(average);
    }
    return averages;
  }

  private getBestAverageInTheMouth(sessions: TrainingSessionDto[]): number {
    let result: number = 0;
    for (const session of sessions) {
      if (session.trainingSessionGroups.length > 0) {
        result = this.scoreService.getBestAverage(
          session.trainingSessionGroups
        );
      }
    }
    return result;
  }

  public extractDistance(
    trainingGroups: TrainingSessionGroupByMouthDto
  ): DropdownModel[] {
    const distanceSetup: number[] = [];

    Object.values(trainingGroups.groupByMouth)
      .flat()
      .forEach((session) => {
        if (
          session.distance != null &&
          !distanceSetup.includes(session.distance)
        ) {
          distanceSetup.push(session.distance);
        }
      });

    return this.dropdownModelService.mapDistanceToDropdownModel(
      Array.from(distanceSetup.values())
    );
  }
  public extractDistance2(
    trainingGroups: TrainingSessionGroupByMouthViewModel[]
  ): DropdownModel[] {
    const distances: number[] = [];

    trainingGroups.forEach((group) => {
      group.trainingSessions.forEach((session) => {
        if (session.distance != null && !distances.includes(session.distance)) {
          distances.push(session.distance);
        }
      });
    });

    return this.dropdownModelService.mapDistanceToDropdownModel(
      Array.from(distances.values())
    );
  }

  public extractSetup(
    trainingGroups: TrainingSessionGroupByMouthViewModel[]
  ): DropdownModel[] {
    const setupMap = new Map<number, UserWeaponSetupDto>();

    trainingGroups.forEach((group) => {
      group.trainingSessions.forEach((session) => {
        setupMap.set(session.setup.id, session.setup);
      });
    });

    return this.dropdownModelService.mapSetupToDropdownModel(
      Array.from(setupMap.values())
    );
  }
  public extractAmmunition(
    trainingGroups: TrainingSessionGroupByMouthViewModel[]
  ): DropdownModel[] {
    const setupMap = new Map<number, AmmunitionDto>();

    trainingGroups.forEach((group) => {
      group.trainingSessions.forEach((session) => {
        setupMap.set(session.ammunition.id, session.ammunition);
      });
    });

    return this.dropdownModelService.mapAmmunitionToDropdownModel(
      Array.from(setupMap.values())
    );
  }
}
