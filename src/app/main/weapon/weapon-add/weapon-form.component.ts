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
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { WeaponDataCollection } from '../../../core/api/models/weapon-data-collection';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { WeaponCategoryDto } from '../../../core/api/models/weapon-category-dto';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { WeaponTypeDto } from '../../../core/api/models/weapon-type-dto';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { WeaponCreateDto } from '../../../core/api/models/weapon-create-dto';

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
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly currentPageMessageHeader: string = 'Gestion des armes';
  // Public field
  public weaponDataCollection!: WeaponDataCollection;
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

  @Output() weaponAdded: EventEmitter<WeaponDto> =
    new EventEmitter<WeaponDto>();
  @Output() weaponEdited: EventEmitter<WeaponDto> =
    new EventEmitter<WeaponDto>();
  @Input() set weaponForm(weapon: WeaponDto | null) {
    this._isEditWeapon = !!weapon;
    if (weapon) {
      this._editedWeapon = weapon;
      this.autoCompleteForm(weapon);
    }
  }

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge la liste des donnee obligatoire pour creer une nouvelle arme
   */
  private loadData(): void {
    this.weaponService.getWeaponDataCollection().subscribe({
      next: (data) => {
        this.weaponDataCollection = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this.currentPageMessageHeader,
          err.error.message
        );
      }
    });
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

  private getWeaponCategoryDto(): WeaponCategoryDto {
    const id = this.form.controls['weaponCategory'].value;

    return <WeaponCategoryDto>(
      this.weaponDataCollection.weaponCategoryList.find(
        (category) => category.id === id
      )
    );
  }

  private getCaliberDto(): CaliberDto {
    const id = this.form.controls['weaponCaliber'].value;

    return <CaliberDto>(
      this.weaponDataCollection.caliberList.find((caliber) => caliber.id === id)
    );
  }

  private getWeaponFactoryDto(): FactoryDto {
    const id = this.form.controls['weaponFactory'].value;

    return <FactoryDto>(
      this.weaponDataCollection.weaponFactoryList.find(
        (factory) => factory.id === id
      )
    );
  }

  private getWeaponTypeDto(): WeaponTypeDto {
    const id = this.form.controls['weaponType'].value;

    return <WeaponTypeDto>(
      this.weaponDataCollection.weaponTypeList.find((type) => type.id === id)
    );
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
    this.weaponService
      .newWeapon({
        body: newWeapon
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Nouvelle arme ajoutée'
          );
          this.weaponAdded.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.currentPageMessageHeader,
            err.error.message
          );
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
    this.weaponService
      .editWeapon({
        body: editWeapon
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Arme correctement modifiée'
          );
          this.weaponEdited.emit(res);
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
