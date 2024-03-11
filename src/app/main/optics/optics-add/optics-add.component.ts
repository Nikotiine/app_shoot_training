import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OpticsService } from '../../../core/api/services/optics.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { OpticsDataCollection } from '../../../core/api/models/optics-data-collection';
import { OpticsBodyDiameterDto } from '../../../core/api/models/optics-body-diameter-dto';
import { OpticsFocalPlaneDto } from '../../../core/api/models/optics-focal-plane-dto';
import { OpticsOutletDiameterDto } from '../../../core/api/models/optics-outlet-diameter-dto';
import { OpticsUnitDto } from '../../../core/api/models/optics-unit-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { OpticsDto } from '../../../core/api/models/optics-dto';
import {
  OpticsClickValue,
  OpticsClickValueInterface,
  OpticsUnit
} from '../../../core/app/model/OpticsClickValue';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { OpticsCreateDto } from '../../../core/api/models/optics-create-dto';

@Component({
  selector: 'app-optics-add',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './optics-add.component.html',
  styleUrl: './optics-add.component.scss'
})
export class OpticsAddComponent implements OnInit {
  @Output() opticsAdded: EventEmitter<OpticsDto> =
    new EventEmitter<OpticsDto>();

  public form: FormGroup;
  public opticsDataCollection!: OpticsDataCollection;
  private readonly opticsUnitMil: string = 'MRAD';
  public opticsClickValues: OpticsClickValueInterface[] = [];

  constructor(
    private readonly OpticsService: OpticsService,
    private fb: FormBuilder,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      opticsFactory: [0, Validators.required],
      opticsFocalPlan: [0, Validators.required],
      opticsClickType: [2, Validators.required],
      opticsBodyDiameter: [0, Validators.required],
      opticsOutletDiameter: [0, Validators.required],
      name: ['', Validators.required],
      opticsMinZoom: [null, Validators.required],
      opticsMaxZoom: [null],
      opticsMaxDerivation: [null],
      maxDerivationUnit: [2],
      opticsMaxElevation: [null],
      maxElevationUnit: [2],
      opticsMinParallax: [null],
      opticsValueOfOneClick: new FormControl(
        { value: 0, disabled: false },
        Validators.required
      ),
      isParallax: [false]
    });
    this.opticsClickValues = OpticsClickValue.getClickValuesMoa();
  }

  public ngOnInit(): void {
    this.loadDataCollection();
  }

  private loadDataCollection(): void {
    this.OpticsService.getOpticsDataCollection().subscribe({
      next: (data) => {
        this.opticsDataCollection = data;
      },
      error: (err) => {
        this.customMessageService.errorMessage('Optique', err.error.message);
      }
    });
  }

  /**
   * Soumission du formulaire pour une nouvelle optique
   * en cas de success le EventEmitter envoi la reponse (OpticsDto) au template parent
   */
  public submit(): void {
    const opticsClickTypeId = this.form.controls['opticsClickType'].value;
    const newOptics: OpticsCreateDto = {
      bodyDiameter: this.getOpticsBodyDiameter(),
      opticsUnit: this.getOpticsUnit(opticsClickTypeId),
      factory: this.getOpticsFactory(),
      focalPlane: this.getFocalPlane(),
      outletDiameter: this.getOpticsOutletDiameter(),
      maxDerivation: this.maxDerivation(),
      maxElevation: this.maxElevation(),
      maxZoom: this.form.controls['opticsMaxZoom'].value,
      minZoom: this.form.controls['opticsMinZoom'].value,
      minParallax: this.form.controls['opticsMinParallax'].value,
      name: this.form.controls['name'].value,
      parallax: this.form.controls['isParallax'].value,
      valueOfOneClick: this.form.controls['opticsValueOfOneClick'].value
    };
    this.OpticsService.newOptics({
      body: newOptics
    }).subscribe({
      next: (res) => {
        this.customMessageService.successMessage(
          'Gestion des optiques',
          'Nouvelle optique ajoutée'
        );
        this.opticsAdded.emit(res);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Optique', err.error.message);
      }
    });
  }

  private getOpticsBodyDiameter(): OpticsBodyDiameterDto {
    const id = this.form.controls['opticsBodyDiameter'].value;
    return <OpticsBodyDiameterDto>(
      this.opticsDataCollection.opticsBodyDiameterList.find(
        (bodyDiameter) => bodyDiameter.id === id
      )
    );
  }

  private getOpticsUnit(id: number): OpticsUnitDto {
    return <OpticsUnitDto>(
      this.opticsDataCollection.opticsUnitList.find(
        (clickType) => clickType.id === id
      )
    );
  }

  private getOpticsFactory(): FactoryDto {
    const id = this.form.controls['opticsFactory'].value;
    return <FactoryDto>(
      this.opticsDataCollection.opticsFactoryList.find(
        (factory) => factory.id === id
      )
    );
  }

  private getFocalPlane(): OpticsFocalPlaneDto {
    const id = this.form.controls['opticsFocalPlan'].value;
    return <OpticsFocalPlaneDto>(
      this.opticsDataCollection.opticsFocalPlaneList.find(
        (focalPlane) => focalPlane.id === id
      )
    );
  }

  private getOpticsOutletDiameter(): OpticsOutletDiameterDto {
    const id = this.form.controls['opticsOutletDiameter'].value;
    return <OpticsOutletDiameterDto>(
      this.opticsDataCollection.opticsOutletDiameterList.find(
        (outletDiameter) => outletDiameter.id === id
      )
    );
  }

  private maxDerivation(): number {
    const maxDerivation: number =
      this.form.controls['opticsMaxDerivation'].value;
    const maxDerivationUnitId = this.form.controls['maxDerivationUnit'].value;

    return this.convertMilToMoa(maxDerivation, maxDerivationUnitId);
  }
  private maxElevation(): number {
    const maxElevation: number = this.form.controls['opticsMaxElevation'].value;
    const maxElevationUnitId = this.form.controls['maxElevationUnit'].value;

    return this.convertMilToMoa(maxElevation, maxElevationUnitId);
  }

  /**
   * Converti les milliradian en MOA si l'utilisateur chois cette unite (mil) pour l'elevation max et derivation max
   * Pour garde une logique propoe en base de donnee
   * @param moa les moa passer en param
   * @param unitId l id de l unite choisi
   * @private
   */
  private convertMilToMoa(moa: number, unitId: number): number {
    const opticsUnit: OpticsUnitDto = this.getOpticsUnit(unitId);
    if (opticsUnit.label === this.opticsUnitMil) {
      moa = Math.round(moa * 3.4377);
    }
    return moa;
  }

  opticUnitSelected(unitId: number) {
    const value = this.opticsDataCollection.opticsUnitList.find(
      (unit) => unit.id === unitId
    );
    if (value?.label === OpticsUnit.MOA) {
      this.opticsClickValues = OpticsClickValue.getClickValuesMoa();
      this.form.controls['opticsValueOfOneClick'].enable();
    } else {
      this.opticsClickValues = OpticsClickValue.getClickValuesMil();
      this.form.controls['opticsValueOfOneClick'].setValue(1);
    }
  }
}
