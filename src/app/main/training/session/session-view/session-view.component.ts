import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal
} from '@angular/core';

import { DatePipe } from '@angular/common';

import { TrainingSessionViewModel } from '../../../../core/app/model/TrainingSessionViewModel.model';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import {
  ChartDisplay,
  ChartService
} from '../../../../core/app/services/chart.service';
import { ButtonModule } from 'primeng/button';
import { ChartData, ChartOptions } from 'chart.js';
import { ColorService } from '../../../../core/app/services/color.service';

@Component({
  selector: 'app-session-view',
  standalone: true,
  imports: [
    DatePipe,
    KnobModule,
    FormsModule,
    TagModule,
    ChartModule,
    ButtonModule
  ],
  templateUrl: './session-view.component.html',
  styleUrl: './session-view.component.scss'
})
export class SessionViewComponent {
  // Private field
  private _session!: TrainingSessionViewModel;
  private readonly chartService: ChartService = inject(ChartService);

  // Public field
  public data!: ChartData;
  public options!: ChartOptions;

  public $_chartDisplay: WritableSignal<ChartDisplay> = signal(
    this.chartService.getChartDisplay(1)
  );

  @Input() set trainingSession(session: TrainingSessionViewModel | null) {
    if (session) {
      this._session = session;
      if (session.groups) {
        this.data = this.chartService.getData(session.groups, 1);
      }

      this.options = this.chartService.getOptions(1);
    }
  }

  get session(): TrainingSessionViewModel {
    return this._session;
  }
  //************************************ PUBLIC METHODS ************************************

  public nextChart(id: number): void {
    const nextChartId: number = id === 3 ? 1 : id + 1;
    this.$_chartDisplay.set(this.chartService.getChartDisplay(nextChartId));
    if (this._session.groups) {
      this.data = this.chartService.getData(this._session.groups, nextChartId);
      this.options = this.chartService.getOptions(nextChartId);
    }
  }

  public previousChart(id: number): void {
    const nextChartId: number = id === 1 ? 3 : id - 1;
    this.$_chartDisplay.set(this.chartService.getChartDisplay(nextChartId));
    if (this._session.groups) {
      this.data = this.chartService.getData(this._session.groups, nextChartId);
      this.options = this.chartService.getOptions(nextChartId);
    }
  }

  //************************************ PRIVATE METHODS ************************************
  protected readonly ColorService = ColorService;
}