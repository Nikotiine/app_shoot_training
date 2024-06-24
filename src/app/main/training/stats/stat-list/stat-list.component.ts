import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { StatsService } from '../../../../core/app/services/stats.service';
import { UserService } from '../../../../core/app/services/user.service';

import { ChartData, ChartOptions } from 'chart.js';

import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TrainingSessionGroupByMouthViewModel } from '../../../../core/app/model/TrainingSessionGroupByMouthViewModel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-stat-list',
  standalone: true,
  imports: [
    ChartModule,
    InputNumberModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent implements OnInit {
  private readonly statsService: StatsService = inject(StatsService);
  private readonly userService: UserService = inject(UserService);
  private _trainingViewModel: TrainingSessionGroupByMouthViewModel[] = [];
  private _userId!: number;
  // Public field
  public data!: ChartData;
  public options!: ChartOptions;
  public $currentYear: WritableSignal<number> = signal(
    new Date().getFullYear()
  );
  public $selectedLabel: WritableSignal<string> = signal('Année complete');
  public months: string[] = this.statsService.getMonths();
  public isLoading: boolean = true;

  public $totalTrainingSessionInCurrentYear: WritableSignal<number> = signal(0);

  public ngOnInit(): void {
    const user = this.userService.getProfile();
    if (user) {
      this._userId = user.id;
      this.loadData(user.id, this.$currentYear());
    }
  }

  private loadData(id: number, year: number): void {
    this.statsService.getTrainingSessionGroupByMouth(id, year).subscribe({
      next: (data) => {
        this._trainingViewModel =
          this.statsService.createTrainingSessionGroupByMouthViewModel(data);
        this.data = this.statsService.getChartData(this._trainingViewModel);
        this.$totalTrainingSessionInCurrentYear.set(
          this.getTotalTrainingSessionInCurrentYear(this._trainingViewModel)
        );
        this.options = this.statsService.getOptions();
        this.isLoading = false;
      },
      error: (err) => {
        this.statsService.errorMessage(err.error.message);
      }
    });
  }

  private getTotalTrainingSessionInCurrentYear(
    trainingViewModel: TrainingSessionGroupByMouthViewModel[]
  ): number {
    let total: number = 0;
    for (const training of trainingViewModel) {
      total += training.trainingSessions.length;
    }
    return total;
  }

  public nextYear(): void {
    this.$currentYear.update((value) => value + 1);
    this.loadData(this._userId, this.$currentYear());
  }

  public previousYear(): void {
    this.$currentYear.update((value) => value - 1);
    this.loadData(this._userId, this.$currentYear());
  }

  public onSelectMonths(event: MultiSelectChangeEvent): void {
    this.$selectedLabel.set(
      event.value.length < 12
        ? event.value.length + ' mois selectionnés'
        : 'Année complete'
    );
    const filteredMonths: string[] = event.value;
    const filteredTrainingSessions: TrainingSessionGroupByMouthViewModel[] = [];
    for (const month of filteredMonths) {
      const trainingSession: TrainingSessionGroupByMouthViewModel = <
        TrainingSessionGroupByMouthViewModel
      >this._trainingViewModel.find((t) => t.mouth === month);
      filteredTrainingSessions.push(trainingSession);
    }
    this.data = this.statsService.getChartData(filteredTrainingSessions);
  }
}
