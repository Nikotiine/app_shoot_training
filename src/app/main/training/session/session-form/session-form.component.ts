import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

import { CustomUserService } from '../../../../core/app/services/custom-user.service';

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
  private readonly customUserService: CustomUserService =
    inject(CustomUserService);
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
    support: [null, Validators.required]
  });

  public ammunitions: DropdownModel[] = [];
  public userSetups: DropdownModel[] = [];
  public positions: DropdownModel[] =
    this.trainingService.getTrainingPositions();
  public supports: DropdownModel[] = this.trainingService.getWeaponSupports();
  public isLoading: boolean = true;
  public title: WritableSignal<string> = signal('Nouvelle session');
  public ammunitionNotSelected: WritableSignal<boolean> = signal(true);
  public ammunitionSelected: WritableSignal<AmmunitionDto | null> =
    signal(null);
  public weaponSelected: WritableSignal<WeaponDto | null> = signal(null);
  public speedHistoriesSaved: WritableSignal<
    AmmunitionSpeedHistoryCreateDto[] | null
  > = signal(null);
  public groupsSaved: WritableSignal<TrainingSessionGroupCreateDto[] | null> =
    signal(null);
  public isSpeedHistoryForm: boolean = false;
  public isSessionGroupForm: boolean = false;

  public ngOnInit(): void {
    const user = this.customUserService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

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
      support: this.form.controls['support'].value
    };

    this.trainingService.saveTrainingSession(session).subscribe({
      next: (res) => {
        this.trainingService.successCreateMessage();
      },
      error: (err) => {
        this.trainingService.errorMessage(err.error.message);
      }
    });
  }

  private getAmmunition(): AmmunitionDto {
    const id = this.form.controls['ammunition'].value;
    return <AmmunitionDto>this._ammunitions.find((ammo) => ammo.id === id);
  }

  private getSetup(): UserWeaponSetupDto {
    const id = this.form.controls['setup'].value;
    return <UserWeaponSetupDto>(
      this._userSetups.find((setup) => setup.id === id)
    );
  }

  public onChangeAmmunition(): void {
    this.ammunitionSelected.set(this.getAmmunition());
    this.weaponSelected.set(this.getSetup().weapon);
    this.ammunitionNotSelected.set(false);
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

  public setSessionGroup(sessionGroups: TrainingSessionGroupCreateDto[]): void {
    this._sessionGroup = sessionGroups;
    this.groupsSaved.set(sessionGroups);
    this.isSessionGroupForm = !this.isSessionGroupForm;
    this.trainingService.savedForm('Resultats et groupememnts');
  }

  public setSpeedHistories(
    speedHistories: AmmunitionSpeedHistoryCreateDto[]
  ): void {
    this._speedHistories = speedHistories;
    this.speedHistoriesSaved.set(speedHistories);
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
    this.trainingService.savedForm('Vitesse des munitions');
  }

  public cancelSpeedHistories(): void {
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
  }
}
