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
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { FactoryService } from '../../../core/api/services/factory.service';
import { forkJoin } from 'rxjs';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { AmmunitionCreateDto } from '../../../core/api/models/ammunition-create-dto';
import { WeightViewModel } from '../../../core/app/model/WeightViewModel';
import { AppWeightService } from '../../../core/app/services/app-weight.service';

@Component({
  selector: 'app-ammunition-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule
  ],
  templateUrl: './ammunition-form.component.html',
  styleUrl: './ammunition-form.component.scss'
})
export class AmmunitionFormComponent implements OnInit {
  // Private field
  private _weights: AmmunitionWeightDto[] = [];
  private _isEditAmmunition: boolean = false;
  private readonly _currentPageMessageHeader: string = 'Gestion des munitions';
  private _editedAmmunition!: AmmunitionDto;
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly caliberService: CaliberService = inject(CaliberService);
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly appWeightService: AppWeightService =
    inject(AppWeightService);

  // Public field
  public form: FormGroup = inject(FormBuilder).group({
    name: ['', Validators.required],
    factory: [0, Validators.min(1)],
    initialSpeed: [null, Validators.required],
    caliber: [0, Validators.min(1)],
    weight: new FormControl({ value: 0, disabled: true }, Validators.min(1))
  });
  public calibers: CaliberDto[] = [];
  public factories: FactoryDto[] = [];
  public weights: WeightViewModel[] = [];
  protected title: WritableSignal<string> = signal('');
  @Output() added: EventEmitter<AmmunitionDto> =
    new EventEmitter<AmmunitionDto>();
  @Output() edited: EventEmitter<AmmunitionDto> =
    new EventEmitter<AmmunitionDto>();

  @Input() set ammunition(ammunition: AmmunitionDto | null) {
    this._isEditAmmunition = !!ammunition;
    this.setTitle();
    if (ammunition) {
      this._editedAmmunition = ammunition;
      this.autoCompleteForm(ammunition);
    }
  }
  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les calibre et les marque de munitions
   * @private
   */
  private loadData(): void {
    forkJoin([
      this.caliberService.getAllCalibers(),
      this.factoryService.getAllFactoryByType({
        type: FactoryType.AMMUNITION
      })
    ]).subscribe({
      next: (data) => {
        this.calibers = data[0];
        this.factories = data[1];
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this._currentPageMessageHeader,
          err.error.message
        );
      }
    });
  }

  public submit(): void {
    const ammunition: AmmunitionCreateDto = {
      name: this.form.controls['name'].value,
      factory: this.getAmmunitionFactory(),
      weight: this.getAmmunitionWeight(),
      initialSpeed: this.form.controls['initialSpeed'].value,
      ballisticCoefficient: 1,
      caliber: this.getCaliber()
    };
    if (!this._isEditAmmunition) {
      this.createAmmunition(ammunition);
    } else {
      this.editAmmunition(ammunition);
    }
  }

  /**
   * Charge la liste des poids disponible selon le calibre selectioné
   * @param caliberId number
   */
  public selectedCaliber(caliberId: number): void {
    this.appWeightService.getWeightByCaliber(caliberId).subscribe({
      next: (weight) => {
        this.weights = this.appWeightService.createWeightVM(weight);
        this._weights = weight;
        this.form.controls['weight'].enable();
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  /**
   * Retourne la marque choisie
   */
  private getAmmunitionFactory(): FactoryDto {
    const id = this.form.controls['factory'].value;
    return <FactoryDto>this.factories.find((factory) => factory.id === id);
  }

  /**
   * Retourne le poid selectioné
   */
  private getAmmunitionWeight(): AmmunitionWeightDto {
    const id = this.form.controls['weight'].value;
    return <AmmunitionWeightDto>(
      this._weights.find((weight) => weight.id === id)
    );
  }

  /**
   * Retourne le calibre selectioné
   */
  private getCaliber(): CaliberDto {
    const id = this.form.controls['caliber'].value;
    return <CaliberDto>this.calibers.find((caliber) => caliber.id === id);
  }

  /**
   * Pre rempli le formulaire avec les donnee de la munition a edité
   * @param ammunition AmmunitionDto
   */
  private autoCompleteForm(ammunition: AmmunitionDto): void {
    this.form.controls['name'].setValue(ammunition.name);
    this.form.controls['factory'].setValue(ammunition.factory.id);
    this.form.controls['initialSpeed'].setValue(ammunition.initialSpeed);
    this.form.controls['caliber'].setValue(ammunition.caliber.id);
    this.selectedCaliber(ammunition.caliber.id);
    this.form.controls['weight'].enable();
    this.form.controls['weight'].setValue(ammunition.weight.id);
  }

  private createAmmunition(ammunition: AmmunitionCreateDto) {
    this.ammunitionService
      .newAmmunition({
        body: ammunition
      })
      .subscribe({
        next: (res) => {
          this.added.emit(res);
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Muntion ajoutée'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  private editAmmunition(ammunition: AmmunitionCreateDto) {
    const editedAmmunition: AmmunitionDto = {
      ...ammunition,
      id: this._editedAmmunition.id,
      active: this._editedAmmunition.active,
      createdAt: this._editedAmmunition.createdAt
    };
    this.ammunitionService
      .editAmmunition({
        body: editedAmmunition
      })
      .subscribe({
        next: (res) => {
          this.edited.emit(res);
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Munition modifiée'
          );
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
    this._isEditAmmunition
      ? this.title.set('Modifier la munition')
      : this.title.set('Ajouter un nouvelle munition');
  }
}
