import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberCreateDto } from '../../../core/api/models/caliber-create-dto';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-caliber-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './caliber-form.component.html',
  styleUrl: './caliber-form.component.scss'
})
export class CaliberFormComponent {
  // Private field
  private readonly caliberService: CaliberService = inject(CaliberService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private _isEditCaliber: boolean = false;
  private _caliber!: CaliberDto;
  private readonly currentPageMessageHeader: string = 'Gestion des calibres';
  // Public field
  public form: FormGroup = inject(FormBuilder).group({
    label: ['', Validators.required]
  });

  @Output() caliberAdded: EventEmitter<CaliberDto> =
    new EventEmitter<CaliberDto>();
  @Output() caliberEdited: EventEmitter<CaliberDto> =
    new EventEmitter<CaliberDto>();
  @Input() set caliberForm(caliber: CaliberDto | null) {
    this._isEditCaliber = !!caliber;
    if (caliber) {
      this._caliber = caliber;
      this.autoCompleteForm(caliber);
    }
  }

  public submit(): void {
    const caliber: CaliberCreateDto = {
      label: this.form.controls['label'].value
    };
    if (!this._isEditCaliber) {
      this.createCaliber(caliber);
    } else {
      this.editCaliber(caliber);
    }
  }

  private autoCompleteForm(caliber: CaliberDto): void {
    this.form.controls['label'].setValue(caliber.label);
  }

  private createCaliber(caliber: CaliberCreateDto) {
    this.caliberService
      .saveCaliber({
        body: caliber
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Nouveau calibre ajouté'
          );
          this.caliberAdded.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  private editCaliber(caliber: CaliberCreateDto): void {
    const editedCaliber: CaliberDto = {
      ...caliber,
      id: this._caliber.id,
      active: this._caliber.active,
      createdAt: this._caliber.createdAt
    };
    this.caliberService
      .editCaliber({
        body: editedCaliber
      })
      .subscribe({
        next: (res) => {
          this.caliberEdited.emit(res);
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Calibre edité'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }
}
