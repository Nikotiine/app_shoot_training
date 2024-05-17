import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';
import { AmmunitionSpeedHistoryCreateDto } from '../../../core/api/models/ammunition-speed-history-create-dto';
import { TrainingService } from '../../../core/app/services/training.service';

@Component({
  selector: 'app-ammunition-speed-histories-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, ButtonModule],
  templateUrl: './ammunition-speed-histories-form.component.html',
  styleUrl: './ammunition-speed-histories-form.component.scss'
})
export class AmmunitionSpeedHistoriesFormComponent implements OnInit {
  // Private field
  private fb: FormBuilder = inject(FormBuilder);
  private _weapon!: WeaponDto;
  private _ammunition!: AmmunitionDto;
  private readonly trainingService: TrainingService = inject(TrainingService);
  private _isEditSpeedHistoriesArray: boolean = false;
  private readonly _currentComponentHeader: string = 'Vitesse des munitions';

  // Public field
  public form: FormGroup = this.fb.group({
    speedHistories: this.fb.array([])
  });
  protected $enableDeleteAll: WritableSignal<boolean> = signal(false);
  @Input() set ammunition(ammunition: AmmunitionDto | null) {
    if (ammunition) {
      this._ammunition = ammunition;
    }
  }
  @Input() set weapon(weapon: WeaponDto | null) {
    if (weapon) {
      this._weapon = weapon;
    }
  }
  @Input() set speedHistories(
    speedHistories: AmmunitionSpeedHistoryCreateDto[] | null
  ) {
    if (speedHistories) {
      this.autoCompleteForm(speedHistories);
      this._isEditSpeedHistoriesArray = speedHistories.length > 0;
    }
  }
  @Output() save: EventEmitter<AmmunitionSpeedHistoryCreateDto[]> =
    new EventEmitter<AmmunitionSpeedHistoryCreateDto[]>();

  @Output() cancelSpeedHistories: EventEmitter<void> = new EventEmitter<void>();

  //************************************ PUBLIC METHODS ************************************
  public ngOnInit(): void {
    if (!this._isEditSpeedHistoriesArray) {
      this.addNewSpeed();
    } else {
      this.$enableDeleteAll.set(true);
    }
  }
  /**
   * Creation du Array pour les speedHistories
   */
  get speedArray(): FormArray {
    return this.form.controls['speedHistories'] as FormArray;
  }

  /**
   * Ajout d'une nouvelle vitesse
   * Met a jour le tableau d'objet du formulaire
   */
  public addNewSpeed(): void {
    this.speedArray.push(
      this.fb.group({
        speed: [this._ammunition.initialSpeed, Validators.required],
        weapon: this._weapon,
        ammunition: this._ammunition
      })
    );
    if (this.speedArray.length > 1) {
      this.$enableDeleteAll.set(true);
    }
  }

  /**
   * Enleve un element du tableau
   * @param i index de l'element
   */
  public removeSpeed(i: number): void {
    this.speedArray.removeAt(i);
    if (this.speedArray.length < 2) {
      this.$enableDeleteAll.set(false);
    }
  }

  public sendSpeedHistories(): void {
    this.trainingService.savedForm(this._currentComponentHeader);
    this.save.emit(this.form.controls['speedHistories'].value);
  }

  /**
   * Pop-up de confirmation de suppression des vitesses
   * @param event Event
   */
  public async confirm(event: Event): Promise<void> {
    if (this.speedArray.length === 0) {
      this.cancel();
    } else {
      const confirmed = await this.trainingService.confirmation(
        event,
        'Effacer toutes les vitesses ?'
      );
      if (confirmed) {
        this.speedArray.clear();
        this.trainingService.clearSpeedHistoryForm(
          this._currentComponentHeader
        );
        this.save.emit(this.form.controls['speedHistories'].value);
      }
    }
  }

  public cancel(): void {
    this.cancelSpeedHistories.emit();
  }
  //************************************ PRIVATE METHODS ************************************

  private autoCompleteForm(speedHistories: AmmunitionSpeedHistoryCreateDto[]) {
    for (const speed of speedHistories) {
      this.speedArray.push(
        this.fb.group({
          speed: [speed.speed],
          weapon: [speed.weapon],
          ammunition: [speed.ammunition]
        })
      );
    }
  }
}
