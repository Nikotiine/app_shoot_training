import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';

import { UserService } from '../../../../core/app/services/user.service';

import { TrainingService } from '../../../../core/app/services/training.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TrainingSessionCreateDto } from '../../../../core/api/models/training-session-create-dto';
import { AmmunitionDto } from '../../../../core/api/models/ammunition-dto';
import { UserWeaponSetupDto } from '../../../../core/api/models/user-weapon-setup-dto';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModel } from '../../../../core/app/model/DropdownModel';
import { CalendarModule } from 'primeng/calendar';
import { GroupFormComponent } from '../../group/group-form/group-form.component';
import { TrainingSessionGroupCreateDto } from '../../../../core/api/models/training-session-group-create-dto';
import { AmmunitionSpeedHistoriesFormComponent } from '../../../ammunition/ammunition-speed-histories-form/ammunition-speed-histories-form.component';
import { WeaponDto } from '../../../../core/api/models/weapon-dto';
import { AmmunitionSpeedHistoryCreateDto } from '../../../../core/api/models/ammunition-speed-history-create-dto';
import { TrainingSessionDto } from '../../../../core/api/models/training-session-dto';
import { Router } from '@angular/router';
import { Routing } from '../../../../core/app/enum/Routing.enum';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    GroupFormComponent,
    AmmunitionSpeedHistoriesFormComponent
  ],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss'
})
export class SessionFormComponent implements OnInit {
  // Private field
  private readonly trainingService: TrainingService = inject(TrainingService);
  private readonly customUserService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);
  private _userSetups: UserWeaponSetupDto[] = [];
  private _ammunitions: AmmunitionDto[] = [];
  private readonly fb: FormBuilder = inject(FormBuilder);
  private _sessionGroup: TrainingSessionGroupCreateDto[] = [];
  private _speedHistories: AmmunitionSpeedHistoryCreateDto[] = [];

  // Public field
  public form: FormGroup = this.fb.group({
    date: [new Date(), Validators.required],
    distance: [50],
    temperature: [20],
    windSpeed: [0],
    ammunition: new FormControl(
      { value: 0, disabled: true },
      Validators.min(1)
    ),
    setup: [0, Validators.min(1)],
    position: [null, Validators.required],
    support: [null, Validators.required],
    pressure: [0]
  });

  public ammunitions: DropdownModel[] = [];
  public userSetups: DropdownModel[] = [];
  public positions: DropdownModel[] =
    this.trainingService.getTrainingPositions();
  public supports: DropdownModel[] = this.trainingService.getWeaponSupports();
  public isLoading: boolean = true;
  public $title: WritableSignal<string> = signal('Nouvelle session');
  public $ammunitionNotSelected: WritableSignal<boolean> = signal(true);
  public $ammunitionSelected: WritableSignal<AmmunitionDto | null> =
    signal(null);
  public $weaponSelected: WritableSignal<WeaponDto | null> = signal(null);
  public $speedHistoriesSaved: WritableSignal<
    AmmunitionSpeedHistoryCreateDto[] | null
  > = signal(null);
  public $groupsSaved: WritableSignal<TrainingSessionGroupCreateDto[] | null> =
    signal(null);
  public isSpeedHistoryForm: boolean = false;
  public isSessionGroupForm: boolean = false;

  @Output() newSessionAdded: EventEmitter<TrainingSessionDto> =
    new EventEmitter();

  //************************************ PUBLIC METHODS ************************************
  public ngOnInit(): void {
    const user = this.customUserService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

  /**
   * Une fois le setup choisi active le choix des munition en foction du calibre du setup
   * @param id du calibre du setup
   */
  public setupSelected(id: number): void {
    this.trainingService.getAmmunitionByCaliber(id).subscribe({
      next: (data) => {
        this.form.controls['ammunition'].enable();
        this._ammunitions = data;
        this.ammunitions =
          this.trainingService.mapAmmunitionToDropdownModel(data);
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Sousmission du formulaire d'ajout ou d'edition d'une session d'entrainement
   */
  public submit(): void {
    const session: TrainingSessionCreateDto = {
      date: this.form.controls['date'].value,
      distance: this.form.controls['distance'].value,
      temperature: this.form.controls['temperature'].value,
      windSpeed: this.form.controls['windSpeed'].value,
      ammunition: this.getAmmunition(),
      setup: this.getSetup(),
      speedHistories: this._speedHistories,
      trainingSessionGroups: this._sessionGroup,
      position: this.form.controls['position'].value,
      support: this.form.controls['support'].value,
      pressure: this.form.controls['pressure'].value
    };

    this.trainingService.saveTrainingSession(session).subscribe({
      next: (res) => {
        this.trainingService.successCreateMessage();
        this.newSessionAdded.emit(res);
        this.router.navigate([
          '/' + Routing.TRAINING + '/' + Routing.TRAINING_SESSION_LIST
        ]);
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Au choix de la munition => autorise l'ajout de resultat et ou de vitesse
   * Set le choix la munition pour l'enregistrement des vitesse ( vitesse initial constructeur )
   */
  public onChangeAmmunition(): void {
    this.$ammunitionSelected.set(this.getAmmunition());
    this.$weaponSelected.set(this.getSetup().weapon);
    this.$ammunitionNotSelected.set(false);
  }
  public showSpeedHistoriesForm(): void {
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
  }
  public showSessionGroupForm(): void {
    this.isSessionGroupForm = true;
  }

  public cancelSessionGroup(): void {
    this.isSessionGroupForm = !this.isSessionGroupForm;
  }
  public cancelSpeedHistories(): void {
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
  }

  /**
   * Quand l'event sessionGroup est recu met a jour le tableau des groupement qui sera envoyer au back
   * Set le signal des groupement sauvegarder au cas ou l'utilisateur veuille modifier ce qu'il a deja enregister
   * Remet le formulaire en hidden et afficher le messsage de confirmation de l'enregistrement des groupement
   * @param sessionGroups TrainingSessionGroupCreateDto[]
   */
  public setSessionGroup(sessionGroups: TrainingSessionGroupCreateDto[]): void {
    this._sessionGroup = sessionGroups;
    this.$groupsSaved.set(sessionGroups);
    this.isSessionGroupForm = !this.isSessionGroupForm;
    this.trainingService.savedForm('Resultats et groupememnts');
  }

  /**
   * Comportement identique a setSessionGroup mais cette fois pour les vitesse de munition
   * @param speedHistories AmmunitionSpeedHistoryCreateDto[]
   */
  public setSpeedHistories(
    speedHistories: AmmunitionSpeedHistoryCreateDto[]
  ): void {
    this._speedHistories = speedHistories;
    this.$speedHistoriesSaved.set(speedHistories);
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
    this.trainingService.savedForm('Vitesse des munitions');
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge les setup d'arme de l'utilisateur connecté et creer le dropdown model pour les armes
   * Affiche le formulaire une fois les données correctment recu
   * @param id de l'utilisateur
   */
  private loadData(id: number): void {
    this.trainingService.getUserSetups(id).subscribe({
      next: (data) => {
        this._userSetups = data;
        this.userSetups = this.trainingService.mapSetupToDropdownModel(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Retourne la munition choisie part l'utilisateur sous forme dobjet AmmunitionDto
   */
  private getAmmunition(): AmmunitionDto {
    const id = this.form.controls['ammunition'].value;
    return <AmmunitionDto>this._ammunitions.find((ammo) => ammo.id === id);
  }

  /**
   * Retroune le setup de l'utilisateur sous UserWeaponSetupDto
   * @private
   */
  private getSetup(): UserWeaponSetupDto {
    const id = this.form.controls['setup'].value;
    return <UserWeaponSetupDto>(
      this._userSetups.find((setup) => setup.id === id)
    );
  }
}
