import { Component, EventEmitter, inject, Output } from '@angular/core';
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
  selector: 'app-caliber-add',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './caliber-add.component.html',
  styleUrl: './caliber-add.component.scss'
})
export class CaliberAddComponent {
  @Output() caliberAdded: EventEmitter<CaliberDto> =
    new EventEmitter<CaliberDto>();
  private readonly caliberService: CaliberService = inject(CaliberService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  public form: FormGroup = inject(FormBuilder).group({
    label: ['', Validators.required]
  });

  public submit(): void {
    const newCaliber: CaliberCreateDto = {
      label: this.form.controls['label'].value
    };
    this.caliberService
      .saveCaliber({
        body: newCaliber
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            'Calibre',
            'Nouveau calibre ajouté'
          );
          this.caliberAdded.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage('Calibre', err.error.message);
        }
      });
  }
}
