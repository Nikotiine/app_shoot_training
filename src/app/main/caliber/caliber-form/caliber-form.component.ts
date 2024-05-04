import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CaliberCreateDto } from '../../../core/api/models/caliber-create-dto';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CaliberService } from '../../../core/app/services/caliber.service';

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
  private _isEditCaliber: boolean = false;
  private _caliber!: CaliberDto;

  // Public field
  public form: FormGroup = inject(FormBuilder).group({
    label: ['', Validators.required]
  });
  protected $title: WritableSignal<string> = signal('');
  @Output() added: EventEmitter<CaliberDto> = new EventEmitter<CaliberDto>();
  @Output() edited: EventEmitter<CaliberDto> = new EventEmitter<CaliberDto>();
  @Input() set caliber(caliber: CaliberDto | null) {
    this._isEditCaliber = !!caliber;
    this.setTitle();
    if (caliber) {
      this._caliber = caliber;
      this.autoCompleteForm(caliber);
    }
  }

  //************************************ PUBLIC METHODS ************************************

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

  //************************************ PRIVATE METHODS ************************************
  private autoCompleteForm(caliber: CaliberDto): void {
    this.form.controls['label'].setValue(caliber.label);
  }

  private createCaliber(caliber: CaliberCreateDto) {
    this.caliberService.save(caliber).subscribe({
      next: (res) => {
        this.caliberService.successMessage('Nouveau calibre ajouté');
        this.added.emit(res);
      },
      error: (err) => {
        this.caliberService.errorMessage(err.error.message);
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
    this.caliberService.edit(editedCaliber).subscribe({
      next: (res) => {
        this.edited.emit(res);
        this.caliberService.successMessage('Calibre edité');
      },
      error: (err) => {
        this.caliberService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Defini le titre a afficher selon creatin ou edition
   */
  private setTitle(): void {
    this._isEditCaliber
      ? this.$title.set('Modifier le calibre')
      : this.$title.set('Ajouter un nouveau calibre');
  }
}
