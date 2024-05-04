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
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { WeaponCategoryDto } from '../../../core/api/models/weapon-category-dto';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { WeaponTypeDto } from '../../../core/api/models/weapon-type-dto';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { WeaponCreateDto } from '../../../core/api/models/weapon-create-dto';
import { WeaponService } from '../../../core/app/services/weapon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-weapon-form',
  standalone: true,
  imports: [
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './weapon-form.component.html',
  styleUrl: './weapon-form.component.scss'
})
export class WeaponFormComponent implements OnInit {
  // Private field
  private _editedWeapon!: WeaponDto;
  private _isEditWeapon = false;
  private readonly weaponService: WeaponService = inject(WeaponService);
  // Public field
  public weaponCategories: WeaponCategoryDto[] = [];
  public calibers: CaliberDto[] = [];
  public weaponTypes: WeaponTypeDto[] = [];
  public factories: FactoryDto[] = [];
  public form: FormGroup = inject(FormBuilder).group({
    weaponCaliber: [0, Validators.min(1)],
    weaponCategory: [0, Validators.min(1)],
    weaponType: [0, Validators.min(1)],
    weaponFactory: [0],
    weaponModel: ['', Validators.required],
    barrelLength: [null, [Validators.required, Validators.min(1)]],
    isHeavyBarrel: [false],
    barrelStripes: [null],
    newWeaponFactory: [''],
    variation: ['']
  });
  public isLoading: boolean = true;
  protected $title: WritableSignal<string> = signal('');

  @Output() weaponAdded: EventEmitter<WeaponDto> =
    new EventEmitter<WeaponDto>();
  @Output() weaponEdited: EventEmitter<WeaponDto> =
    new EventEmitter<WeaponDto>();

  @Input() set weaponForm(weapon: WeaponDto | null) {
    this._isEditWeapon = !!weapon;
    this.setTitle();
    if (weapon) {
      this._editedWeapon = weapon;
      this.autoCompleteForm(weapon);
    }
  }

  //************************************ PUBLIC METHODS ************************************
  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Envoie du formulaire en bdd
   * en cas de success le EventEmitter envoi la reponse (WeaponDto) au template parent
   */
  public submit(): void {
    const weapon: WeaponCreateDto = {
      category: this.getWeaponCategoryDto(),
      caliber: this.getCaliberDto(),
      factory: this.getWeaponFactoryDto(),
      type: this.getWeaponTypeDto(),
      model: this.form.controls['weaponModel'].value,
      barrelLength: this.form.controls['barrelLength'].value,
      heavyBarrel: this.form.controls['isHeavyBarrel'].value,
      barrelStripes: this.form.controls['barrelStripes'].value,
      variation: this.form.controls['variation'].value.toLowerCase()
    };
    if (!this._isEditWeapon) {
      this.createNewWeapon(weapon);
    } else {
      this.editWeapon(weapon);
    }
  }

  //************************************ PRIVATE METHODS ************************************
  /**
   * Charge la liste des donnee obligatoire pour creer une nouvelle arme
   */
  private loadData(): void {
    forkJoin([
      this.weaponService.getWeaponCategories(),
      this.weaponService.getWeaponFactories(),
      this.weaponService.getWeaponTypes(),
      this.weaponService.getWeaponCalibers()
    ]).subscribe({
      next: (data) => {
        this.weaponCategories = data[0];
        this.factories = data[1];
        this.weaponTypes = data[2];
        this.calibers = data[3];
        this.isLoading = false;
      },
      error: (err) => {
        this.weaponService.errorMessage(err.error.message);
      }
    });
  }

  private getWeaponCategoryDto(): WeaponCategoryDto {
    const id = this.form.controls['weaponCategory'].value;

    return <WeaponCategoryDto>(
      this.weaponCategories.find((category) => category.id === id)
    );
  }

  private getCaliberDto(): CaliberDto {
    const id = this.form.controls['weaponCaliber'].value;

    return <CaliberDto>this.calibers.find((caliber) => caliber.id === id);
  }

  private getWeaponFactoryDto(): FactoryDto {
    const id = this.form.controls['weaponFactory'].value;

    return <FactoryDto>this.factories.find((factory) => factory.id === id);
  }

  private getWeaponTypeDto(): WeaponTypeDto {
    const id = this.form.controls['weaponType'].value;

    return <WeaponTypeDto>this.weaponTypes.find((type) => type.id === id);
  }

  private autoCompleteForm(weapon: WeaponDto): void {
    this.form.controls['weaponCaliber'].setValue(weapon.caliber.id);
    this.form.controls['weaponCategory'].setValue(weapon.category.id);
    this.form.controls['weaponType'].setValue(weapon.type.id);
    this.form.controls['weaponFactory'].setValue(weapon.factory.id);
    this.form.controls['weaponModel'].setValue(weapon.model);
    this.form.controls['barrelLength'].setValue(weapon.barrelLength);
    this.form.controls['isHeavyBarrel'].setValue(weapon.heavyBarrel);
    this.form.controls['barrelStripes'].setValue(weapon.barrelStripes);
    this.form.controls['variation'].setValue(weapon.variation);
  }

  private createNewWeapon(newWeapon: WeaponCreateDto) {
    this.weaponService.createWeapon(newWeapon).subscribe({
      next: (res) => {
        this.weaponService.successMessage('Nouvelle arme ajoutée');
        this.weaponAdded.emit(res);
      },
      error: (err) => {
        this.weaponService.errorMessage(err.error.message);
      }
    });
  }

  private editWeapon(weapon: WeaponCreateDto) {
    const editWeapon: WeaponDto = {
      ...weapon,
      id: this._editedWeapon.id,
      active: this._editedWeapon.active,
      createdAt: this._editedWeapon.createdAt
    };
    this.weaponService.editWeapon(editWeapon).subscribe({
      next: (res) => {
        this.weaponService.successMessage('Arme correctement modifiée');
        this.weaponEdited.emit(res);
      },
      error: (err) => {
        this.weaponService.errorMessage(err.error.message);
      }
    });
  }
  /**
   * Defini le titre a afficher selon creatin ou edition
   */
  private setTitle(): void {
    this._isEditWeapon
      ? this.$title.set("Modifier l'arme")
      : this.$title.set('Ajouter une nouvelle arme');
  }
}
