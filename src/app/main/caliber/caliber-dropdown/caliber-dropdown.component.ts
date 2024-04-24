import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-caliber-dropdown',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './caliber-dropdown.component.html',
  styleUrl: './caliber-dropdown.component.scss'
})
export class CaliberDropdownComponent {
  // Private field
  private _id: number = 0;
  private readonly caliberService: CaliberService = inject(CaliberService);

  // Public field
  public $customPlaceholder: WritableSignal<string> =
    signal('Filter par calibre');
  public form: FormGroup = inject(FormBuilder).group({
    caliber: [this.id]
  });
  public calibers: CaliberDto[] = [];

  @Output() selectedCaliber: EventEmitter<CaliberDto> =
    new EventEmitter<CaliberDto>();
  @Input() set initDropdown(caliberId: number) {
    this._id = caliberId;
    this.loadCalibers();
    // Si l'id d'init du formulaire est differente de 0, initialise le dropdown avec l'id passé en input
    if (caliberId != 0) {
      this.form.controls['caliber'].setValue(caliberId);
    }
  }
  @Input() set disable(disable: boolean) {
    disable
      ? this.form.controls['caliber'].disable()
      : this.form.controls['caliber'].enable();
  }

  @Input() set placeholder(placeholder: string) {
    if (placeholder) {
      this.$customPlaceholder.set(placeholder);
    }
  }
  get id(): number {
    return this._id;
  }

  //************************************ PUBLIC METHODS ************************************

  /**
   * Emet l'id du calibre choisi dans le dropdown
   * @param id
   */
  public sendId(id: number): void {
    const caliber = this.calibers.find((c) => c.id === id);
    this.selectedCaliber.emit(caliber);
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge la liste de tous les calibres disponibles
   */
  private loadCalibers() {
    this.caliberService.getAllCalibers().subscribe({
      next: (calibers) => {
        this.calibers = calibers;
      },
      error: (err) => {
        inject(CustomMessageService).errorMessage(
          'Calibre service',
          err.error.message
        );
      }
    });
  }
}
