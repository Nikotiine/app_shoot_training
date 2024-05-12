import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { UserService } from '../../../../core/app/services/user.service';
import { TrainingService } from '../../../../core/app/services/training.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DropdownModel } from '../../../../core/app/model/DropdownModel';
import { MultiSelectModule } from 'primeng/multiselect';
import { forkJoin } from 'rxjs';
import {
  TrainingSessionTableViewModel,
  TrainingSessionViewModel
} from '../../../../core/app/model/TrainingSessionViewModel.model';
import { AmmunitionDto } from '../../../../core/api/models/ammunition-dto';
import { Router, RouterLink } from '@angular/router';
import { Routing } from '../../../../core/app/enum/Routing.enum';
import { TrainingSessionDto } from '../../../../core/api/models/training-session-dto';
import { SessionViewComponent } from '../session-view/session-view.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { UserProfileDto } from '../../../../core/api/models/user-profile-dto';

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
    MultiSelectModule,
    RouterLink,
    SessionViewComponent,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss'
})
export class SessionListComponent implements OnInit {
  // Private field
  private readonly customUserService: UserService = inject(UserService);
  private readonly trainingService: TrainingService = inject(TrainingService);
  private readonly router: Router = inject(Router);
  protected readonly Routing = Routing;
  private _trainingSessionDto: TrainingSessionDto[] = [];
  private _user: UserProfileDto | null = null;

  // Public field
  public sessions: TrainingSessionTableViewModel[] = [];
  public isLoading: boolean = true;
  public positions: DropdownModel[] =
    this.trainingService.getTrainingPositions();
  public distances: DropdownModel[] = [];
  public userSetup: DropdownModel[] = [];
  public selectedSession!: TrainingSessionTableViewModel;
  public ammunitions: DropdownModel[] = [];
  public isShowSessionView: boolean = false;
  public $sessionView: WritableSignal<TrainingSessionViewModel | null> =
    signal(null);
  //************************************ PUBLIC METHODS ************************************

  public ngOnInit(): void {
    this._user = this.customUserService.getProfile();
    if (this._user) {
      this.loadData(this._user.id);
    }
  }

  /**
   * A la selection de la ligne affiche la modale de session view et met a jour le signal $_sessionView
   * @param session TrainingSessionTableViewModel
   */
  public onRowSelect(session: TrainingSessionTableViewModel): void {
    this.isShowSessionView = !this.isShowSessionView;
    const selectedSession: TrainingSessionDto = <TrainingSessionDto>(
      this._trainingSessionDto.find(
        (sessionDto) => sessionDto.id === session.id
      )
    );
    this.$sessionView.set(
      this.trainingService.createTrainingViewModel(selectedSession)
    );
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge les donnee depuis l'api
   * Toutes les sessions de l'utilisateur
   * Tout les setup de l'utilisateur
   * @param id de l'utilisateur
   */
  private loadData(id: number): void {
    forkJoin([
      this.trainingService.getActiveTrainingSessionById(id),
      this.trainingService.getUserSetups(id)
    ]).subscribe({
      next: (data) => {
        this._trainingSessionDto = data[0];
        console.log(data[0]);
        this.generateSessionViewModels(data[0]);
        this.userSetup = this.trainingService.mapSetupToDropdownModel(data[1]);
        this.isLoading = false;
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Creer les differents view model en rapport avec les sessions
   * @param sessions TrainingSessionDto[]
   */
  private generateSessionViewModels(sessions: TrainingSessionDto[]) {
    this.sessions = this.trainingService.createTrainingSessionTableVM(sessions);
    const ammunitions: AmmunitionDto[] = [];
    const distances: number[] = [];
    for (const session of sessions) {
      if (session.distance) {
        distances.push(session.distance);
      }
      ammunitions.push(session.ammunition);
    }
    this.distances = this.trainingService.mapDistanceToDropdownModel(distances);
    this.ammunitions =
      this.trainingService.mapAmmunitionToDropdownModel(ammunitions);
  }

  /**
   * Popup de confirmation de suppresion de session
   * @param event Event
   * @param id de la session
   */
  public async confirm(event: Event, id: number): Promise<void> {
    const confirmed = await this.trainingService.confirmation(
      event,
      'Supprimer cette session ? '
    );
    if (confirmed) {
      this.disableSession(id);
    }
  }

  /**
   * Suppression d'une session
   * @param id de la session
   */
  private disableSession(id: number): void {
    this.trainingService.disableTrainingSession(id).subscribe({
      next: (res) => {
        this._trainingSessionDto = res;
        this.generateSessionViewModels(res);
        this.trainingService.successMessage('Session supprimée');
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  public showDeletedSessions(): void {
    if (this._user) {
      this.trainingService.getAllTrainingSessions(this._user.id).subscribe({
        next: (res) => {
          this._trainingSessionDto = res;
          this.generateSessionViewModels(res);
        },
        error: (err) => {
          this.trainingService.errorMessage(err.error.message);
        }
      });
    }
  }

  public navigateToEditSession(id: number): void {
    this.router.navigate([
      '/' + Routing.TRAINING + '/' + Routing.TRAINING_SESSION_EDIT + '/' + id
    ]);
  }
}
