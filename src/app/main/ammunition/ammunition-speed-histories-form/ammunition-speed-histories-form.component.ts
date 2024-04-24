import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-ammunition-speed-histories-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, ButtonModule],
  templateUrl: './ammunition-speed-histories-form.component.html',
  styleUrl: './ammunition-speed-histories-form.component.scss'
})
export class AmmunitionSpeedHistoriesFormComponent {
  // Private field
  private fb: FormBuilder = inject(FormBuilder);
  private _weapon!: WeaponDto;
  private _ammunition!: AmmunitionDto;
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);

  // Public field
  public form: FormGroup = this.fb.group({
    speedHistories: this.fb.array([])
  });
  @Input() set ammunition(ammunition: AmmunitionDto | null) {
    if (ammunition) {
      this._ammunition = ammunition;
      this.addNewSpeed();
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
    }
  }
  @Output() save: EventEmitter<AmmunitionSpeedHistoryCreateDto[]> =
    new EventEmitter<AmmunitionSpeedHistoryCreateDto[]>();

  @Output() cancelSpeedHistories: EventEmitter<void> = new EventEmitter<void>();

  //************************************ PUBLIC METHODS ************************************

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
  }

  /**
   * Enleve un element du tableau
   * @param i index de l'element
   */
  public removeSpeed(i: number): void {
    this.speedArray.removeAt(i);
  }

  public sendSpeedHistories(): void {
    this.save.emit(this.form.controls['speedHistories'].value);
  }

  /**
   * Pop-up de confirmation de suppression des vitesses
   * @param event Event
   */
  public async confirm(event: Event): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Effacer toutes les vitesses ?',
      'Vitesse des munition'
    );
    if (confirmed) {
      this.cancel();
    }
  }

  //************************************ PRIVATE METHODS ************************************

  private cancel(): void {
    this.speedArray.clear();
    this.cancelSpeedHistories.emit();
  }

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
