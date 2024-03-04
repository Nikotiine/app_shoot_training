import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { NewAmmunitionDto } from '../../../core/api/models/new-ammunition-dto';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { FactoryService } from '../../../core/api/services/factory.service';
import { forkJoin } from 'rxjs';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';

@Component({
  selector: 'app-ammunition-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule
  ],
  templateUrl: './ammunition-add.component.html',
  styleUrl: './ammunition-add.component.scss'
})
export class AmmunitionAddComponent implements OnInit {
  @Output() newAmmunitionAdded: EventEmitter<AmmunitionDto> =
    new EventEmitter<AmmunitionDto>();
  public form: FormGroup;
  public calibers: CaliberDto[] = [];
  public factories: FactoryDto[] = [];
  public weights: AmmunitionWeightDto[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly ammunitionService: AmmunitionService,
    private readonly customMessageService: CustomMessageService,
    private readonly caliberService: CaliberService,
    private readonly factoryService: FactoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      factory: [0, Validators.min(1)],
      initialSpeed: [null, Validators.required],
      caliber: [0, Validators.min(1)],
      weight: new FormControl({ value: 0, disabled: true }, Validators.min(1))
    });
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
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public submit(): void {
    const newAmmunition: NewAmmunitionDto = {
      name: this.form.controls['name'].value,
      factory: this.getAmmunitionFactory(),
      weight: this.getAmmunitionWeight(),
      initialSpeed: this.form.controls['initialSpeed'].value,
      ballisticCoefficient: 1,
      caliber: this.getCaliber()
    };
    this.ammunitionService
      .newAmmunition({
        body: newAmmunition
      })
      .subscribe({
        next: (res) => {
          this.newAmmunitionAdded.emit(res);
          this.customMessageService.successMessage('Admin', 'Muntion ajoutée');
        },
        error: (err) => {
          this.customMessageService.errorMessage('Admin', err.error.message);
        }
      });
  }

  public selectedCaliber(caliberId: number): void {
    this.ammunitionService
      .getWeightByCaliber({
        id: caliberId
      })
      .subscribe({
        next: (weight) => {
          this.weights = weight;
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
    return <AmmunitionWeightDto>this.weights.find((weight) => weight.id === id);
  }

  private getCaliber(): CaliberDto {
    const id = this.form.controls['caliber'].value;
    return <CaliberDto>this.calibers.find((caliber) => caliber.id === id);
  }
}
