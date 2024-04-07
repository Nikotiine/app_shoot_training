import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

import { CustomUserService } from '../../../../core/app/services/custom-user.service';

import { CustomTrainingService } from '../../../../core/app/services/custom-training.service';
import {
  FormArray,
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
    CalendarModule
  ],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss'
})
export class SessionFormComponent implements OnInit {
  // Private field
  private readonly customTrainingService: CustomTrainingService = inject(
    CustomTrainingService
  );
  private readonly customUserService: CustomUserService =
    inject(CustomUserService);
  private _userSetups: UserWeaponSetupDto[] = [];
  private _ammunitions: AmmunitionDto[] = [];
  private readonly fb: FormBuilder = inject(FormBuilder);
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
    speedHistories: this.fb.array([])
  });

  public ammunitions: DropdownModel[] = [];
  public userSetups: DropdownModel[] = [];
  public isLoading: boolean = true;
  public title: WritableSignal<string> = signal('titre');
  public isSpeedHistoryForm: boolean = false;
  public ngOnInit(): void {
    const user = this.customUserService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

  private loadData(id: number): void {
    this.customTrainingService.getUserSetups(id).subscribe({
      next: (data) => {
        this._userSetups = data;
        this.createSetupViewModel(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.customTrainingService.errorMessage(err.error.message);
      }
    });
  }

  public setupSelected(id: number): void {
    this.customTrainingService.getAmmunitionByCaliber(id).subscribe({
      next: (data) => {
        this.form.controls['ammunition'].enable();
        this._ammunitions = data;
        this.createAmmunitionViewModel(data);
      },
      error: (err) => {
        this.customTrainingService.errorMessage(err.error.message);
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
      speedHistories: this.speed()
    };
    this.customTrainingService.saveTrainingSession(session).subscribe({
      next: (res) => {
        this.customTrainingService.successCreateMessage();
      },
      error: (err) => {
        this.customTrainingService.errorMessage(err.error.message);
      }
    });
  }

  private speed(): AmmunitionSpeedHistoryCreateDto[] {
    return [
      {
        speed: 12,
        ammunition: this.getAmmunition(),
        weapon: this.getSetup().weapon
      },
      {
        speed: 15,
        ammunition: this.getAmmunition(),
        weapon: this.getSetup().weapon
      }
    ];
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

  private createSetupViewModel(setups: UserWeaponSetupDto[]): void {
    this.userSetups = setups.map((setup) => {
      return {
        id: setup.id,
        name: `${setup.weapon.factory.name}-${setup.weapon.model} + ${setup.optics.factory.name}-${setup.optics.name} ${setup.optics.minZoom}-${setup.optics.maxZoom}x${setup.optics.outletDiameter.label}`
      };
    });
  }

  private createAmmunitionViewModel(ammunition: AmmunitionDto[]) {
    this.ammunitions = ammunition.map((ammo) => {
      return {
        id: ammo.id,
        name: `${ammo.factory.name} - ${ammo.name} / ${ammo.weight.grains} grains`
      };
    });
  }

  public addSpeedHistories(): void {
    this.isSpeedHistoryForm = !this.isSpeedHistoryForm;
    if (this.speedArray.length < 1) {
      this.addNewSpeed();
    }
  }
  /**
   * Creation du Array pour les speedHistories
   */
  get speedArray(): FormArray {
    return this.form.controls['speedHistories'] as FormArray;
  }

  // Ajout d'une nouvelle vitesse
  public addNewSpeed(): void {
    this.speedArray.push(
      this.fb.group({
        speed: [0, Validators.required]
      })
    );
  }
  // Suppression d'un secteur ( sauf le 1 obligatoire )
  public removeSpeed(i: number): void {
    this.speedArray.removeAt(i);
  }
}