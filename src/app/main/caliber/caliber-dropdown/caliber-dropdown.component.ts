import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal
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
      this.customPlaceholder.set(placeholder);
    }
  }
  get id(): number {
    return this._id;
  }

  @Output() selectedCaliber: EventEmitter<CaliberDto> =
    new EventEmitter<CaliberDto>();

  private _id: number = 0;
  public customPlaceholder = signal('Filter par calibre');

  private readonly caliberService: CaliberService = inject(CaliberService);

  // Init du formulaire.
  public form: FormGroup = inject(FormBuilder).group({
    caliber: [this.id]
  });
  public calibers: CaliberDto[] = [];

  /**
   * Charge la liste de tous les calibres disponibles
   * @private
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

  /**
   * Emet l'id du calibre choisi dans le dropdown
   * @param id
   */
  sendId(id: number) {
    const caliber = this.calibers.find((c) => c.id === id);
    this.selectedCaliber.emit(caliber);
  }
}
