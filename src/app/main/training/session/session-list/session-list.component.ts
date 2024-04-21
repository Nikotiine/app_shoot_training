import { Component, inject, OnInit } from '@angular/core';
import { CustomUserService } from '../../../../core/app/services/custom-user.service';
import { TrainingService } from '../../../../core/app/services/training.service';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TrainingPosition } from '../../../../core/app/enum/TrainingSession.enum';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DropdownModel } from '../../../../core/app/model/DropdownModel';
import { MultiSelectModule } from 'primeng/multiselect';
import { forkJoin } from 'rxjs';
import { TrainingSessionViewModel } from '../../../../core/app/model/TrainingSessionViewModel.model';
import { AmmunitionDto } from '../../../../core/api/models/ammunition-dto';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DatePipe,
    TagModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule
  ],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss'
})
export class SessionListComponent implements OnInit {
  // Private field
  private readonly customUserService: CustomUserService =
    inject(CustomUserService);
  private readonly trainingService: TrainingService = inject(TrainingService);

  // Public field
  public sessions: TrainingSessionViewModel[] = [];
  public isLoading: boolean = true;
  public positions: DropdownModel[] =
    this.trainingService.getTrainingPositions();
  public distances: DropdownModel[] = [];
  public userSetup: DropdownModel[] = [];
  public selectedSession!: TrainingSessionViewModel;
  // Public method
  public ammunitions: DropdownModel[] = [];
  ngOnInit(): void {
    const user = this.customUserService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

  private loadData(id: number): void {
    forkJoin([
      this.trainingService.getTrainingSessionById(id),
      this.trainingService.getUserSetups(id)
    ]).subscribe({
      next: (data) => {
        this.sessions = this.trainingService.createTrainingSessionViewModel(
          data[0]
        );
        const ammunitions: AmmunitionDto[] = [];
        const distances: number[] = [];
        for (const session of data[0]) {
          if (session.distance) {
            distances.push(session.distance);
          }
          ammunitions.push(session.ammunition);
        }
        this.distances =
          this.trainingService.mapDistanceToDropdownModel(distances);
        this.ammunitions =
          this.trainingService.mapAmmunitionToDropdownModel(ammunitions);

        this.userSetup = this.trainingService.mapSetupToDropdownModel(data[1]);
        this.isLoading = false;
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }
  getSeverity(status: string): string {
    console.log(status);
    let color: string = '';
    switch (status) {
      case TrainingPosition.STANDING:
        color = 'danger';
        break;

      case TrainingPosition.LYING:
        color = 'success';
        break;

      case TrainingPosition.KNEELING:
        color = 'info';
        break;

      case TrainingPosition.SEATED:
        color = 'warning';
        break;

      default:
        color = '';
        break;
    }
    return color;
  }

  onRowSelect(session: TrainingSessionViewModel) {
    console.log(session);
  }
}
