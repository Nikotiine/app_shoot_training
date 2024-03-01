import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FactoryService } from '../../../core/api/services/factory.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { NewFactoryDto } from '../../../core/api/models/new-factory-dto';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-factory-add',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './factory-add.component.html',
  styleUrl: './factory-add.component.scss'
})
export class FactoryAddComponent {
  @Input() set factoryType(type: FactoryType) {
    this._factory = type;
    this.setTitle(type);
  }
  get factory(): FactoryType {
    return this._factory;
  }
  private _factory!: FactoryType;
  @Output() newFactory: EventEmitter<FactoryDto> =
    new EventEmitter<FactoryDto>();

  public form: FormGroup;
  public factoryLabel = signal('');
  constructor(
    private readonly fb: FormBuilder,
    private readonly factoryService: FactoryService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  public submit(): void {
    const newFactory: NewFactoryDto = {
      name: this.form.controls['name'].value,
      type: this.factory
    };
    this.factoryService
      .save({
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

  private setTitle(type: FactoryType): void {
    switch (type) {
      case FactoryType.WEAPON:
        this.factoryLabel.set("d'arme");
        break;
      case FactoryType.AMMUNITION:
        this.factoryLabel.set('de munition');
        break;
      case FactoryType.OPTICS:
        this.factoryLabel.set("d'optique");
        break;
      case FactoryType.SOUND_REDUCER:
        this.factoryLabel.set('de moderateur de son');
        break;
      default:
        this.factoryLabel.set('');
    }
  }
}
