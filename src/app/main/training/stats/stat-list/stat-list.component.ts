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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TrainingSessionGroupByMouthViewModel } from '../../../../core/app/model/TrainingSessionGroupByMouthViewModel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

import { DropdownModel } from '../../../../core/app/model/DropdownModel';

export interface Filter {
  ammos: number[] | null;
  setups: number[] | null;
  distances: number[] | null;
}
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
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent implements OnInit {
  private readonly statsService: StatsService = inject(StatsService);
  private readonly userService: UserService = inject(UserService);

  private _trainingViewModel: TrainingSessionGroupByMouthViewModel[] = [];
  private _filteredTrainingViewModel: TrainingSessionGroupByMouthViewModel[] =
    [];
  private _userId!: number;

  private _filters!: Filter;

  // Public field
  public data!: ChartData;
  public options!: ChartOptions;
  public $currentYear: WritableSignal<number> = signal(
    new Date().getFullYear()
  );

  public $selectedLabel: WritableSignal<string> = signal('Année complete');
  public months: string[] = this.statsService.getMonths();
  public setupsAvailable: DropdownModel[] = [];
  public isLoading: boolean = true;
  public distanceAvailable: DropdownModel[] = [];
  public ammunitionAvailable: DropdownModel[] = [];
  public form: FormGroup = inject(FormBuilder).group({
    month: [this.months],
    setup: [],
    ammo: [],
    distance: []
  });
  public $totalTrainingSessionInCurrentYear: WritableSignal<number> = signal(0);
  public $totalFilteredTrainingSession: WritableSignal<number> = signal(0);
  public $isFiltering: WritableSignal<boolean> = signal(false);
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
        this._filteredTrainingViewModel = this._trainingViewModel;
        this.data = this.statsService.getChartData(this._trainingViewModel);
        this.setupsAvailable = this.statsService.extractSetup(
          this._trainingViewModel
        );

        this.distanceAvailable = this.statsService.extractDistance2(
          this._trainingViewModel
        );
        this.ammunitionAvailable = this.statsService.extractAmmunition(
          this._trainingViewModel
        );

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

  public onChangeFilters(): void {
    this._filters = {
      ammos: this.form.controls['ammo'].value,
      setups: this.form.controls['setup'].value,
      distances: this.form.controls['distance'].value
    };
    console.log(this._filters);
    this.applyFilters(this._filteredTrainingViewModel);
  }

  private applyFilters(list: TrainingSessionGroupByMouthViewModel[]): void {
    if (this._filters) {
      list = list.map((vm) => {
        return {
          ...vm,
          trainingSessions: vm.trainingSessions.filter(
            (s) =>
              //Bonne chance pour comprendre
              (!this._filters.ammos ||
                this._filters.ammos.includes(s.ammunition.id)) &&
              (!this._filters.setups ||
                this._filters.setups.includes(s.setup.id)) &&
              (!this._filters.distances ||
                this._filters.distances.includes(<number>s.distance))
          )
        };
      });
      this.verifyIsFiltering();
    }
    this.setTotalFilterdTrainingSession(list);
    this.data = this.statsService.getChartData(list);
  }

  public onChangeMonth(): void {
    const months: string[] = this.form.controls['month'].value;
    this.$selectedLabel.set(
      months.length < 12
        ? months.length + ' mois selectionnés'
        : 'Année complete'
    );
    if (months?.length > 0) {
      this._filteredTrainingViewModel = this._trainingViewModel.filter((t) =>
        months.includes(t.month)
      );
      this.applyFilters(this._filteredTrainingViewModel);
    }

    this.$isFiltering.set(months?.length > 0 && months?.length < 12);
  }

  public onClearDistance(): void {
    this._filters.distances = null;
    this.applyFilters(this._trainingViewModel);
  }

  public onClearAmmo(): void {
    this._filters.ammos = null;
    this.applyFilters(this._trainingViewModel);
  }

  public onClearSetup(): void {
    this._filters.setups = null;
    this.applyFilters(this._trainingViewModel);
  }

  public onClearMonths(): void {
    this.form.controls['month'].setValue(this.months);
    this.$selectedLabel.set('Année complete');
    this.onChangeMonth();
  }

  public resetFilter(): void {
    this._filters = {
      ammos: null,
      setups: null,
      distances: null
    };
    this.form.reset();
    this.onClearMonths();
  }
  private setTotalFilterdTrainingSession(
    list: TrainingSessionGroupByMouthViewModel[]
  ): void {
    const total = this.getTotalTrainingSessionInCurrentYear(list);
    this.$totalFilteredTrainingSession.set(total);
  }

  private verifyIsFiltering(): void {
    const isFiltering =
      (!this._filters.ammos || this._filters.ammos.length === 0) &&
      (!this._filters.setups || this._filters.setups.length === 0) &&
      (!this._filters.distances || this._filters.distances.length === 0);
    this.$isFiltering.set(!isFiltering);
  }
}
