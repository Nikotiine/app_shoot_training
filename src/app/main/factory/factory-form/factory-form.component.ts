import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
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

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FactoryCreateDto } from '../../../core/api/models/factory-create-dto';

@Component({
  selector: 'app-factory-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './factory-form.component.html',
  styleUrl: './factory-form.component.scss'
})
export class FactoryFormComponent {
  // Private field
  private _factory!: FactoryType;
  private _editedFactory!: FactoryDto;
  private _isEditFactory: boolean = false;
  private readonly _currentPageMessageHeader: string = 'Gestion des marques';
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  // Public field
  public form: FormGroup = inject(FormBuilder).group({
    name: ['', Validators.required]
  });
  public $factoryLabel: WritableSignal<string> = signal('');
  protected $title: WritableSignal<string> = signal('');

  @Output() newFactory: EventEmitter<FactoryDto> =
    new EventEmitter<FactoryDto>();
  @Output() editedFactory: EventEmitter<FactoryDto> =
    new EventEmitter<FactoryDto>();
  @Input() set factoryType(type: FactoryType) {
    this._factory = type;
    this.setFactoryTypeLabel(type);
  }
  get factory(): FactoryType {
    return this._factory;
  }
  @Input() set factoryForm(factory: FactoryDto | null) {
    this._isEditFactory = !!factory;
    this.setTitle();
    if (factory) {
      this.autoCompleteForm(factory);
      this._editedFactory = factory;
    }
  }

  //************************************ PUBLIC METHODS ************************************
  /**
   * Soussimision du formulaire en fonction de creation ou d'edition
   */
  public submit(): void {
    const factory: FactoryCreateDto = {
      name: this.form.controls['name'].value,
      type: this.factory
    };
    if (!this._isEditFactory) {
      this.createFactory(factory);
    } else {
      this.editFactory(factory);
    }
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Defifini le label de factory en fonction du type passer en param
   * @param type FactoryType
   */
  private setFactoryTypeLabel(type: FactoryType): void {
    switch (type) {
      case FactoryType.WEAPON:
        this.$factoryLabel.set("d'arme");
        break;
      case FactoryType.AMMUNITION:
        this.$factoryLabel.set('de munition');
        break;
      case FactoryType.OPTICS:
        this.$factoryLabel.set("d'optique");
        break;
      case FactoryType.SOUND_REDUCER:
        this.$factoryLabel.set('de moderateur de son');
        break;
      default:
        this.$factoryLabel.set('');
    }
  }

  /**
   * Pre rempli le formulaire si le input factoryForm est defini
   * @param factory FactoryDto
   */
  private autoCompleteForm(factory: FactoryDto): void {
    this.form.controls['name'].setValue(factory.name);
  }

  /**
   * Creation d'une nouvelle marque
   * @param factory FactoryCreateDto
   */
  private createFactory(factory: FactoryCreateDto): void {
    this.factoryService
      .saveFactory({
        body: factory
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            `Nouvelle marque ${this.$factoryLabel()} disponible`
          );
          this.newFactory.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  /**
   * Edition d'une marque
   * @param factory FactoryCreateDto
   */
  private editFactory(factory: FactoryCreateDto): void {
    const editedFactory: FactoryDto = {
      ...factory,
      id: this._editedFactory.id,
      createdAt: this._editedFactory.createdAt,
      active: this._editedFactory.active
    };
    this.factoryService
      .editFactory({
        body: editedFactory
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            `Marque ${this.$factoryLabel()} modifiée`
          );
          this.editedFactory.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  /**
   * Defini le titre a afficher selon creatin ou edition
   */
  private setTitle(): void {
    this._isEditFactory
      ? this.$title.set('Modifier la marque')
      : this.$title.set('Ajouter une nouvelle marque');
  }
}
