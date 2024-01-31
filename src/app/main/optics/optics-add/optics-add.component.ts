import { Component, OnInit } from '@angular/core';
import { OpticsService } from '../../../core/api/services/optics.service';
import {
  FormBuilder,
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

import { NewOpticsDto } from '../../../core/api/models/new-optics-dto';
import { OpticsBodyDiameterDto } from '../../../core/api/models/optics-body-diameter-dto';

import { OpticsFactoryDto } from '../../../core/api/models/optics-factory-dto';
import { OpticsFocalPlaneDto } from '../../../core/api/models/optics-focal-plane-dto';
import { OpticsOutletDiameterDto } from '../../../core/api/models/optics-outlet-diameter-dto';
import { OpticsUnitDto } from '../../../core/api/models/optics-unit-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

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
  public form: FormGroup;
  public opticsDataCollection!: OpticsDataCollection;
  private readonly opticsUnitMil: string = 'MRAD';

  constructor(
    private readonly OpticsService: OpticsService,
    private fb: FormBuilder,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      opticsFactory: [0, Validators.required],
      opticsFocalPlan: [0, Validators.required],
      opticsClickType: [0, Validators.required],
      opticsBodyDiameter: [0, Validators.required],
      opticsOutletDiameter: [0, Validators.required],
      name: ['', Validators.required],
      opticsMinZoom: [null, Validators.required],
      opticsMaxZoom: [null],
      opticsMaxDerivation: [null],
      maxDerivationUnit: [0],
      opticsMaxElevation: [null],
      maxElevationUnit: [0],
      opticsMinParallax: [null],
      opticsValueOfOneClick: [0],
      isParallax: [false]
    });
  }

  public ngOnInit(): void {
    this.loadDataCollection();
  }

  private loadDataCollection(): void {
    this.OpticsService.getOpticsDataCollection().subscribe({
      next: (data) => {
        console.log(data);
        this.opticsDataCollection = data;
      },
      error: (err) => {
        console.log(err);
        this.customMessageService.errorMessage('Optique', err.error.message);
      }
    });
  }

  public submit(): void {
    const opticsClickTypeId = this.form.controls['opticsClickType'].value;
    const newOptics: NewOpticsDto = {
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
    console.log(newOptics);
    this.OpticsService.newOptics({
      body: newOptics
    }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
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

  private getOpticsFactory(): OpticsFactoryDto {
    const id = this.form.controls['opticsFactory'].value;
    return <OpticsFactoryDto>(
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
  private convertMilToMoa(mil: number, unitId: number): number {
    const opticsUnit: OpticsUnitDto = this.getOpticsUnit(unitId);
    if (opticsUnit.type === this.opticsUnitMil) {
      mil = mil * 3.4377;
    }
    return mil;
  }
}
