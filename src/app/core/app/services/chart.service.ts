import { Injectable } from '@angular/core';
import { TrainingGroup } from '../model/TrainingSessionViewModel.model';

import {
  ActiveElement,
  Chart,
  ChartData,
  ChartEvent,
  ChartOptions
} from 'chart.js';
export interface ChartDisplay {
  id: number;
  label: string;
  optionTitleText: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _chartsDisplay: ChartDisplay[] = [
    {
      id: 1,
      label: 'Score',
      optionTitleText: 'Score sur 100 points'
    },
    {
      id: 2,
      label: 'Groupement moyen',
      optionTitleText: 'Groupement en cm2'
    },
    {
      id: 3,
      label: 'Detail groupement',
      optionTitleText: 'Detail des groupement en cm'
    }
  ];

  public getChartDisplay(id: number): ChartDisplay {
    return <ChartDisplay>this._chartsDisplay.find((chart) => chart.id === id);
  }

  public getData(datas: TrainingGroup[], id: number): ChartData {
    const labels: string[] = this.createLabels(datas, id);
    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: datas.map((data) => data.scoreColor),
          borderColor: 'black',
          data: datas.map((data) => data.score ?? 0),
          fill: false,
          label: 'Score',
          categoryPercentage: 0.3,
          hidden: id != 1
        },
        {
          backgroundColor: datas.map((data) => data.averageGapColor),
          borderColor: 'black',
          data: datas.map((data) => data.averageGap ?? 0),
          fill: false,
          label: 'Ecart moyen',
          categoryPercentage: 0.3,
          hidden: id != 2
        },
        {
          backgroundColor: 'turquoise',
          borderColor: 'black',
          data: datas.map((data) => data.verticalGap ?? 0),
          label: 'Ecart vertical',
          fill: false,
          categoryPercentage: 0.3,
          hidden: id != 3
        },
        {
          backgroundColor: 'orange',
          borderColor: 'black',
          data: datas.map((data) => data.horizontalGap ?? 0),
          label: 'Ecart horizontal',
          fill: false,
          categoryPercentage: 0.3,
          hidden: id != 3
        }
      ]
    };
  }

  getOptions(id: number): ChartOptions {
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
          text: this.getChartDisplay(id).optionTitleText
        },
        legend: {
          display: false,
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
          max: id === 1 ? 100 : undefined,
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

  private createLabels(
    datas: TrainingGroup[],
    charDisplayId: number
  ): string[] {
    const labels: string[] = [];
    let index: number = 0;
    for (const group of datas) {
      index++;
      labels.push(
        this.getChartDisplay(charDisplayId).label +
          ' N°' +
          index +
          ' (' +
          group.totalShoots +
          ' munitions)'
      );
    }
    return labels;
  }
}
