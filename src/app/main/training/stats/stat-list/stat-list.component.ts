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

@Component({
  selector: 'app-stat-list',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent implements OnInit {
  private readonly statsService: StatsService = inject(StatsService);
  private readonly userService: UserService = inject(UserService);

  // Public field
  public data!: ChartData;
  public options!: ChartOptions;
  public $currentYear: WritableSignal<number> = signal(
    new Date().getFullYear()
  );
  ngOnInit(): void {
    const user = this.userService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

  private loadData(id: number): void {
    this.statsService.getTrainingSessionGroupByMouth(id).subscribe({
      next: (data) => {
        console.log(
          this.statsService.createTrainingSessionGroupByMouthViewModel(data)
        );
        for (const key in data.groupByMouth) {
          const mouthName: string = this.statsService.getMonthNameWithIndex(
            Number(key)
          );
          console.log(mouthName);
          console.log(data.groupByMouth[key]);
        }
        this.data = this.statsService.getChartData(
          this.statsService.createTrainingSessionGroupByMouthViewModel(data)
        );
        this.options = this.statsService.getOptions();
      },
      error: (err) => {
        this.statsService.errorMessage(err.error.message);
      }
    });
  }
}
