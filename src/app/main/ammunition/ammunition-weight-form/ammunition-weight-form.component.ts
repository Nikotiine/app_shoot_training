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
  WeightService,
  GrainsAndGrams
} from '../../../core/app/services/weight.service';
import { AmmunitionWeight } from '../../../core/app/enum/AmmunitionWeight.enum';
import { MultiSelectModule } from 'primeng/multiselect';
import { AmmunitionWeightCreateDto } from '../../../core/api/models/ammunition-weight-create-dto';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { WeightViewModel } from '../../../core/app/model/WeightViewModel';

@Component({
  selector: 'app-ammunition-weight-form',
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
  templateUrl: './ammunition-weight-form.component.html',
  styleUrl: './ammunition-weight-form.component.scss'
})
export class AmmunitionWeightFormComponent implements OnInit {
  // Private field
  private readonly weightService: WeightService = inject(WeightService);
  private _weights: AmmunitionWeightDto[] = [];
  private _weight!: AmmunitionWeightDto;
  private _isEditAmmunitionWeight: boolean = false;
  // Public field
  public form: FormGroup = inject(FormBuilder).group({
    weight: [null, Validators.required],
    typeOfWeight: [AmmunitionWeight.GRAIN],
    selectedCalibers: [null, Validators.required]
  });
  public typesOfWeight: WeightViewModel[] =
    this.weightService.getTypesOfWeight();
  public calibers: CaliberDto[] = [];
  protected $title: WritableSignal<string> = signal('');
  @Output() added: EventEmitter<AmmunitionWeightDto> =
    new EventEmitter<AmmunitionWeightDto>();
  @Output() edited: EventEmitter<AmmunitionWeightDto> =
    new EventEmitter<AmmunitionWeightDto>();

  @Input() set weights(weights: AmmunitionWeightDto[]) {
    this._weights = weights;
  }

  @Input() set weight(weight: AmmunitionWeightDto | null) {
    this._isEditAmmunitionWeight = !!weight;
    this.setTitle();
    if (weight) {
      this._weight = weight;
      this.autoCompleteForm(weight);
    }
  }
  //************************************ PUBLIC METHODS ************************************

  /**
   * Sousmission du formulaire pour l'ajout d'un poid
   * Verifie si les parametre sont correct
   */
  public submit(): void {
    if (!this._isEditAmmunitionWeight) {
      this.createNewAmmunitionWeight();
    } else {
      this.editAmmunitionWeight();
    }
  }

  public ngOnInit(): void {
    this.loadData();
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge la liste des calibres pour le mulitselect
   */
  private loadData(): void {
    this.weightService.getAllCalibers().subscribe({
      next: (data) => {
        this.calibers = data;
      },
      error: (err) => {
        this.weightService.errorMessage(err.error.message);
      }
    });
  }

  /**
   * Verifie si le poids indiquer le formulaire n'existe pas deja dans la liste des poids en bdd
   * Verifie si le poids n'est pas trop leger (mini 1 grain)
   * @param grainAndGram GrainsAndGrams interface
   */
  private verifyWeights(grainAndGram: GrainsAndGrams): boolean {
    let isExist: boolean = false;
    const grains = grainAndGram.grains;
    if (grains < 1) {
      this.weightService.warningMessage('Le poids en grain est trop leger');
      this.form.controls['weight'].setValue(null);
      return true;
    }
    for (const weight of this._weights) {
      if (weight.grains === grains) {
        this.weightService.warningMessage('Ce poids existe deja');
        isExist = true;
        this.form.controls['weight'].setValue(null);
      }
    }
    return isExist;
  }

  private autoCompleteForm(weight: AmmunitionWeightDto): void {
    this.form.controls['weight'].setValue(weight.grains);
    this.form.controls['weight'].disable();
    this.form.controls['typeOfWeight'].disable();
    this.form.controls['selectedCalibers'].setValue(weight.calibers);
  }

  /**
   * Defini le titre a afficher selon creatin ou edition
   */
  private setTitle(): void {
    this._isEditAmmunitionWeight
      ? this.$title.set('Modifier le poids')
      : this.$title.set('Ajouter un nouveau poids');
  }

  private createNewAmmunitionWeight(): void {
    const weight = this.form.controls['weight'].value;
    const typeOfWeight = this.form.controls['typeOfWeight'].value;
    const grainAndGram = this.weightService.convert(weight, typeOfWeight);
    const weightExist: boolean = this.verifyWeights(grainAndGram);
    if (!weightExist) {
      const calibers = this.form.controls['selectedCalibers'].value;
      const ammunitionWeightCreate: AmmunitionWeightCreateDto = {
        grains: grainAndGram.grains,
        grams: grainAndGram.grams,
        calibers: calibers
      };
      this.weightService.create(ammunitionWeightCreate).subscribe({
        next: (res) => {
          this.added.emit(res);
          this.weightService.successMessage('poids correctement ajouté');
        },
        error: (err) => {
          this.weightService.errorMessage(err.error.message);
        }
      });
    }
  }

  private editAmmunitionWeight(): void {
    const weight: AmmunitionWeightDto = {
      ...this._weight,
      calibers: this.form.controls['selectedCalibers'].value
    };
    this.weightService.edit(weight).subscribe({
      next: (res) => {
        this.edited.emit(res);
        this.weightService.successMessage('Poids ajouté au calibre');
      },
      error: (err) => {
        this.weightService.errorMessage(err.error.message);
      }
    });
  }
}
