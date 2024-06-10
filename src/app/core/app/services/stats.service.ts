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

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Private field
  private readonly mapperTrainingSessionService: MapperTrainingSessionService =
    inject(MapperTrainingSessionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentPageMessageHeader: string =
    'Gestion des statistiques';
  private readonly _mouthNames = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];
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
    id: number
  ): Observable<TrainingSessionGroupByMouthDto> {
    return this.mapperTrainingSessionService.getTrainingSessionByUserIdGroupByMouthOrderASC(
      id
    );
  }

  public getMonthNameWithIndex(index: number): string {
    if (index < 0 || index > 11) {
      throw new Error('Index must be between 0 and 11');
    }

    return this._mouthNames[index];
  }

  public createTrainingSessionGroupByMouthViewModel(
    trainingSessionGroupByMouth: TrainingSessionGroupByMouthDto
  ): TrainingSessionGroupByMouthViewModel[] {
    const result: TrainingSessionGroupByMouthViewModel[] = [];
    for (let i = 0; i < 11; i++) {
      const wm: TrainingSessionGroupByMouthViewModel = {
        mouth: this.getMonthNameWithIndex(i),
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
      labels: this._mouthNames,
      datasets: [
        {
          label: 'Nombre de seance',
          backgroundColor: 'blue',
          borderColor: 'blue-500',
          data: data.map((d) => d.trainingSessions.length)
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'pink',
          borderColor: 'pink-500',
          data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55, 40]
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
      plugins: {
        title: {
          display: true,
          text: 'tt'
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
}
