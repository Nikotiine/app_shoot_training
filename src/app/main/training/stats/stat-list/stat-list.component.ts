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
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';

import { DropdownModel } from '../../../../core/app/model/DropdownModel';

export interface Filter {
  ammos: number[];
  setups: number[];
  distances: number[];
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

  filters!: Filter;

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

  /*public onSelectMonths(event: MultiSelectChangeEvent): void {
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
      >this._trainingViewModel.find((t) => t.month === month);
      filteredTrainingSessions.push(trainingSession);
    }
    this._filteredTrainingViewModel = filteredTrainingSessions;
    this.data = this.statsService.getChartData(this._filteredTrainingViewModel);
  }*/

  /* public onSelectSetup(event: MultiSelectChangeEvent): void {
    const filteredWeaponSetupId: number[] = event.value;
    const filteredTrainingSessions: TrainingSessionGroupByMouthViewModel[] =
      this._filteredTrainingViewModel.map((vm) => {
        return {
          ...vm,
          trainingSessions: vm.trainingSessions.filter((s) =>
            filteredWeaponSetupId.includes(s.setup.id)
          )
        };
      });

    this._filteredTrainingViewModel = filteredTrainingSessions;
   this.data = this.statsService.getChartData(filteredTrainingSessions);
  } */

  /* public onSelectDistance(event: MultiSelectChangeEvent): void {
    const selectedDistances: number[] = event.value;

    const filteredTrainingSessions: TrainingSessionGroupByMouthViewModel[] =
      this._filteredTrainingViewModel.map((vm) => {
        return {
          ...vm,
          trainingSessions: vm.trainingSessions.filter((s) =>
            selectedDistances.includes(<number>s.distance)
          )
        };
      });
    this.setupsAvailable = this.statsService.extractSetup(
      filteredTrainingSessions
    );
    this._filteredTrainingViewModel = filteredTrainingSessions;
    this.data = this.statsService.getChartData(filteredTrainingSessions);
  }*/

  /* public onSelectAmmo(event: MultiSelectChangeEvent): void {
    const selectedAmmoId: number[] = event.value;
    const filteredTrainingSessions: TrainingSessionGroupByMouthViewModel[] =
      this._filteredTrainingViewModel.map((vm) => {
        return {
          ...vm,
          trainingSessions: vm.trainingSessions.filter((s) =>
            selectedAmmoId.includes(s.ammunition.id)
          )
        };
      });
    this._filteredTrainingViewModel = filteredTrainingSessions;
    this.data = this.statsService.getChartData(filteredTrainingSessions);
  }*/

  onChange(): void {
    const selectedAmmoIds: number[] = this.form.controls['ammo'].value;
    const filteredWeaponSetupIds: number[] = this.form.controls['setup'].value;
    const distances: number[] = this.form.controls['distance'].value;

    const months: string[] = this.form.controls['month'].value;

    const filteredTrainingSessions: TrainingSessionGroupByMouthViewModel[] =
      this._trainingViewModel
        .filter((t) => months.includes(t.month))
        .map((vm) => {
          return {
            ...vm,
            trainingSessions: vm.trainingSessions.filter(
              (s) =>
                selectedAmmoIds.includes(s.ammunition.id) &&
                filteredWeaponSetupIds.includes(s.setup.id) &&
                distances.includes(<number>s.distance)
            )
          };
        });

    this.data = this.statsService.getChartData(filteredTrainingSessions);
  }

  onChangeFilters(): void {
    this.filters = {
      ammos: this.form.controls['ammo'].value,
      setups: this.form.controls['setup'].value,
      distances: this.form.controls['distance'].value
    };

    this.applyFilters(this._filteredTrainingViewModel);
  }

  private applyFilters(list: TrainingSessionGroupByMouthViewModel[]) {
    if (this.filters) {
      list = list.map((vm) => {
        return {
          ...vm,
          trainingSessions: vm.trainingSessions.filter(
            (s) =>
              //Bonne chance pour comprendre
              (!this.filters.ammos ||
                this.filters.ammos.includes(s.ammunition.id)) &&
              (!this.filters.setups ||
                this.filters.setups.includes(s.setup.id)) &&
              (!this.filters.distances ||
                this.filters.distances.includes(<number>s.distance))
          )
        };
      });
    }
    this.data = this.statsService.getChartData(list);
  }

  onChangeMonth(): void {
    const months: string[] = this.form.controls['month'].value;
    if (months?.length > 0) {
      this._filteredTrainingViewModel = this._trainingViewModel.filter((t) =>
        months.includes(t.month)
      );

      this.applyFilters(this._filteredTrainingViewModel);
    }
  }

  onClearDistance() {
    console.log('ii distance');
  }

  onClearAmmo() {
    console.log('ii ammo');
  }

  onClearSetup() {
    console.log('ii setup');
  }

  onClearMonths() {
    console.log('ii month');
    this.form.controls['month'].setValue(this.months);
    this.$selectedLabel.set('Année complete');
    this.data = this.statsService.getChartData(this._trainingViewModel);
  }
}
