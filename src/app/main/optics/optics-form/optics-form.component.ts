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
  selector: 'app-optics-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './optics-form.component.html',
  styleUrl: './optics-form.component.scss'
})
export class OpticsFormComponent implements OnInit {
  // Private field
  private _editedOptic!: OpticsDto;
  private readonly _currentPageMessageHeader: string = 'Gestion des optiques';
  private _isEditOptics: boolean = false;
  private readonly opticsService: OpticsService = inject(OpticsService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  // Public field
  public opticsDataCollection!: OpticsDataCollection;
  public opticsClickValues: OpticsClickValueInterface[] =
    OpticsClickValue.getClickValuesMoa();
  public form: FormGroup = inject(FormBuilder).group({
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
  protected $title: WritableSignal<string> = signal('');
  @Output() added: EventEmitter<OpticsDto> = new EventEmitter<OpticsDto>();
  @Output() edited: EventEmitter<OpticsDto> = new EventEmitter<OpticsDto>();

  @Input() set optics(optic: OpticsDto | null) {
    this._isEditOptics = !!optic;
    this.setTitle();
    if (optic) {
      this._editedOptic = optic;
      this.autoCompleteForm(optic);
    }
  }

  //************************************ PUBLIC METHODS ************************************

  public ngOnInit(): void {
    this.loadDataCollection();
  }

  /**
   * Soumission du formulaire pour une nouvelle optique
   * en cas de success le EventEmitter envoi la reponse (OpticsDto) au template parent
   */
  public submit(): void {
    const opticsClickTypeId = this.form.controls['opticsClickType'].value;
    const optics: OpticsCreateDto = {
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
    if (!this._isEditOptics) {
      this.createNewOptics(optics);
    } else {
      this.editOptic(optics);
    }
  }

  public opticUnitSelected(unitId: number): void {
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
  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge les donnée necessaires pour remplir le formulaire
   */
  private loadDataCollection(): void {
    this.opticsService.getOpticsDataCollection().subscribe({
      next: (data) => {
        this.opticsDataCollection = data;
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
   * Routourne l'objet OpticsBodyDiameterDto en fonction de la valaur selection dans le dropdown
   */
  private getOpticsBodyDiameter(): OpticsBodyDiameterDto {
    const id = this.form.controls['opticsBodyDiameter'].value;
    return <OpticsBodyDiameterDto>(
      this.opticsDataCollection.opticsBodyDiameterList.find(
        (bodyDiameter) => bodyDiameter.id === id
      )
    );
  }

  /**
   * Routourne l'objet OpticsUnitDto en fonction de la valaur selection dans le dropdown
   */
  private getOpticsUnit(id: number): OpticsUnitDto {
    return <OpticsUnitDto>(
      this.opticsDataCollection.opticsUnitList.find(
        (clickType) => clickType.id === id
      )
    );
  }

  /**
   * Routourne l'objet FactoryDto en fonction de la valaur selection dans le dropdown
   */
  private getOpticsFactory(): FactoryDto {
    const id = this.form.controls['opticsFactory'].value;
    return <FactoryDto>(
      this.opticsDataCollection.opticsFactoryList.find(
        (factory) => factory.id === id
      )
    );
  }

  /**
   * Routourne l'objet OpticsFocalPlaneDto en fonction de la valaur selection dans le dropdown
   */
  private getFocalPlane(): OpticsFocalPlaneDto {
    const id = this.form.controls['opticsFocalPlan'].value;
    return <OpticsFocalPlaneDto>(
      this.opticsDataCollection.opticsFocalPlaneList.find(
        (focalPlane) => focalPlane.id === id
      )
    );
  }

  /**
   * Routourne l'objet OpticsOutletDiameterDto en fonction de la valaur selection dans le dropdown
   */
  private getOpticsOutletDiameter(): OpticsOutletDiameterDto {
    const id = this.form.controls['opticsOutletDiameter'].value;
    return <OpticsOutletDiameterDto>(
      this.opticsDataCollection.opticsOutletDiameterList.find(
        (outletDiameter) => outletDiameter.id === id
      )
    );
  }

  /**
   * Routourne la valeur de derivation max en MAO / converti les mrad en mao si l'utlisateur a choisi de remplir ce cham en mead
   */
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
   */
  private convertMilToMoa(moa: number, unitId: number): number {
    const opticsUnit: OpticsUnitDto = this.getOpticsUnit(unitId);
    if (opticsUnit.label === OpticsUnit.MIL) {
      moa = Math.round(moa * 3.4377);
    }
    return moa;
  }

  /**
   * Lors de l'edition d une optique, pre rempli le formulaire avec les données connues de l'optique
   * @param optic OpticsDto
   */
  private autoCompleteForm(optic: OpticsDto): void {
    this.form.controls['name'].setValue(optic.name);
    this.form.controls['opticsMaxZoom'].setValue(optic.maxZoom);
    this.form.controls['opticsMinZoom'].setValue(optic.minZoom);
    this.form.controls['opticsMinParallax'].setValue(optic.minParallax);
    this.form.controls['isParallax'].setValue(optic.parallax);
    this.form.controls['opticsClickType'].setValue(optic.opticsUnit.id);

    //Charge le opticsClickValue en fonction du type de la lunette
    if (optic.opticsUnit.label === OpticsUnit.MOA) {
      this.opticsClickValues = OpticsClickValue.getClickValuesMoa();
    } else {
      this.opticsClickValues = OpticsClickValue.getClickValuesMil();
    }

    this.form.controls['opticsFocalPlan'].setValue(optic.focalPlane.id);
    this.form.controls['opticsBodyDiameter'].setValue(optic.bodyDiameter.id);
    this.form.controls['opticsFactory'].setValue(optic.factory.id);
    this.form.controls['opticsOutletDiameter'].setValue(
      optic.outletDiameter.id
    );
    this.form.controls['opticsMaxDerivation'].setValue(optic.maxDerivation);
    this.form.controls['opticsMaxElevation'].setValue(optic.maxElevation);
    this.form.controls['opticsValueOfOneClick'].setValue(optic.valueOfOneClick);
  }

  /**
   * Soumission du formulaire de creation d'une novuelle optique
   * @param newOptics OpticsCreateDto
   */
  private createNewOptics(newOptics: OpticsCreateDto) {
    this.opticsService
      .newOptics({
        body: newOptics
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Nouvelle optique ajoutée'
          );
          this.added.emit(res);
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
   * Sousmission du formulaire d'edition de l'optique
   * @param optics OpticsCreateDto
   */
  private editOptic(optics: OpticsCreateDto) {
    const editOptics: OpticsDto = {
      ...optics,
      id: this._editedOptic.id,
      active: this._editedOptic.active,
      createdAt: this._editedOptic.createdAt
    };

    this.opticsService
      .editOptics({
        body: editOptics
      })
      .subscribe({
        next: (res) => {
          this.edited.emit(res);
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Optique correctement modifiée'
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
    this._isEditOptics
      ? this.$title.set("Modifier l'optique")
      : this.$title.set('Ajouter un nouveau calibre');
  }
}
