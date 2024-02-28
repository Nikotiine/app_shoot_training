import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { NewAmmunitionFactoryDto } from '../../../core/api/models/new-ammunition-factory-dto';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AmmunitionFactoryDto } from '../../../core/api/models/ammunition-factory-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-ammuntio-factory-add',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-factory.component.html',
  styleUrl: './add-factory.component.scss'
})
export class AddFactoryComponent {
  @Output() newFactory: EventEmitter<AmmunitionFactoryDto> =
    new EventEmitter<AmmunitionFactoryDto>();

  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly ammunitionService: AmmunitionService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  public submit(): void {
    const newFactory: NewAmmunitionFactoryDto = {
      name: this.form.controls['name'].value
    };
    this.ammunitionService
      .newAmmunitionFactory({
        body: newFactory
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            'Admin',
            'Nouvelle marque de munition disponible'
          );
          this.newFactory.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage('Admin', err.error.message);
        }
      });
  }
}
