import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
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
import { AmmunitionWeightService } from '../../../core/app/services/ammunition-weight.service';

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
  private readonly currentPageMessageHeader: string = 'Gestion des munitions';
  private _editedAmmunition!: AmmunitionDto;
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly caliberService: CaliberService = inject(CaliberService);
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly ammunitionWeightService: AmmunitionWeightService = inject(
    AmmunitionWeightService
  );
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

  @Output() newAmmunitionAdded: EventEmitter<AmmunitionDto> =
    new EventEmitter<AmmunitionDto>();
  @Output() ammunitionEdited: EventEmitter<AmmunitionDto> =
    new EventEmitter<AmmunitionDto>();

  @Input() set ammunitionForm(ammunition: AmmunitionDto | null) {
    this._isEditAmmunition = !!ammunition;
    if (ammunition) {
      this._editedAmmunition = ammunition;
      this.autoCompleteForm(ammunition);
    }
  }
  public ngOnInit(): void {
    this.loadData();
  }

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
          this.currentPageMessageHeader,
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

  public selectedCaliber(caliberId: number): void {
    this.ammunitionService
      .getWeightByCaliber({
        id: caliberId
      })
      .subscribe({
        next: (weight) => {
          this.weights = this.ammunitionWeightService.createWeightVM(weight);
          this._weights = weight;
          this.form.controls['weight'].enable();
        },
        error: (err) => {
          this.customMessageService.errorMessage('Admin', err.error.message);
        }
      });
  }

  private getAmmunitionFactory(): FactoryDto {
    const id = this.form.controls['factory'].value;
    return <FactoryDto>this.factories.find((factory) => factory.id === id);
  }

  private getAmmunitionWeight(): AmmunitionWeightDto {
    const id = this.form.controls['weight'].value;
    return <AmmunitionWeightDto>(
      this._weights.find((weight) => weight.id === id)
    );
  }

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
          this.newAmmunitionAdded.emit(res);
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Muntion ajoutée'
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
          this.ammunitionEdited.emit(res);
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Muntion modifiée'
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
