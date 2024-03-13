import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import {
  AmmunitionWeightService,
  GrainsAndGrams
} from '../../../core/app/services/ammunition-weight.service';
import { AmmunitionWeight } from '../../../core/app/enum/AmmunitionWeight.enum';
import { MultiSelectModule } from 'primeng/multiselect';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { AmmunitionWeightCreateDto } from '../../../core/api/models/ammunition-weight-create-dto';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { forkJoin } from 'rxjs';
import { WeightViewModel } from '../../../core/app/model/WeightViewModel';

@Component({
  selector: 'app-ammunition-weight-add',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    CaliberDropdownComponent,
    MultiSelectModule
  ],
  templateUrl: './ammunition-weight-add.component.html',
  styleUrl: './ammunition-weight-add.component.scss'
})
export class AmmunitionWeightAddComponent implements OnInit {
  @Output() newWeight: EventEmitter<AmmunitionWeightDto> =
    new EventEmitter<AmmunitionWeightDto>();

  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly ammunitionWeightService: AmmunitionWeightService = inject(
    AmmunitionWeightService
  );
  private readonly caliberService: CaliberService = inject(CaliberService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  private _weights: AmmunitionWeightDto[] = [];

  public form: FormGroup = inject(FormBuilder).group({
    weight: [null, Validators.required],
    typeOfWeight: [AmmunitionWeight.GRAIN],
    selectedCalibers: [null, Validators.required]
  });

  public typesOfWeight: WeightViewModel[] =
    this.ammunitionWeightService.getTypesOfWeight();
  public calibers: CaliberDto[] = [];
  public submit(): void {
    const weight = this.form.controls['weight'].value;
    const typeOfWeight = this.form.controls['typeOfWeight'].value;
    const grainAndGram = this.ammunitionWeightService.convert(
      weight,
      typeOfWeight
    );
    const weightExist = this.verifyWeights(grainAndGram);
    if (!weightExist) {
      const calibers = this.form.controls['selectedCalibers'].value;
      const ammunitionWeightCreate: AmmunitionWeightCreateDto = {
        grains: grainAndGram.grains,
        grams: grainAndGram.grams,
        calibers: calibers
      };
      this.ammunitionService
        .newWeight({
          body: ammunitionWeightCreate
        })
        .subscribe({
          next: (res) => {
            this.newWeight.emit(res);
          },
          error: (err) => {
            this.customMessageService.errorMessage('Admin', err.error.message);
          }
        });
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin([
      this.caliberService.getAllCalibers(),
      this.ammunitionService.getAllWeight()
    ]).subscribe({
      next: (data) => {
        this.calibers = data[0];
        this._weights = data[1];
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  private verifyWeights(grainAndGram: GrainsAndGrams): boolean {
    let isExist: boolean = false;
    const grains = grainAndGram.grains;
    if (grains < 1) {
      this.customMessageService.errorMessage(
        'Nouveau poids',
        'Le poids en grain est trop leger'
      );
      this.form.controls['weight'].setValue(null);
      return true;
    }
    for (const weight of this._weights) {
      if (weight.grains === grains) {
        this.customMessageService.errorMessage(
          'Nouveau poids',
          'Ce poids existe deja'
        );
        isExist = true;
        this.form.controls['weight'].setValue(null);
      }
    }
    return isExist;
  }
}
