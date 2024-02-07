import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { NewWeaponDto } from '../../../core/api/models/new-weapon-dto';
import { WeaponCategoryDto } from '../../../core/api/models/weapon-category-dto';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { WeaponFactoryDto } from '../../../core/api/models/weapon-factory-dto';
import { WeaponTypeDto } from '../../../core/api/models/weapon-type-dto';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-weapon-add',
  standalone: true,
  imports: [
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './weapon-add.component.html',
  styleUrl: './weapon-add.component.scss'
})
export class WeaponAddComponent implements OnInit {
  @Output() weaponAdded: EventEmitter<WeaponDto> =
    new EventEmitter<WeaponDto>();

  public weaponDataCollection!: WeaponDataCollection;
  public form: FormGroup;
  public isLoading: boolean = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly weaponService: WeaponService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
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
          'Gestion des armes',
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
    const newWeapon: NewWeaponDto = {
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
    this.weaponService
      .newWeapon({
        body: newWeapon
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            'Gestion des armes',
            'Nouvelle arme ajouté'
          );
          this.weaponAdded.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            'Gestion des armes',
            err.error.message
          );
        }
      });
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

  private getWeaponFactoryDto(): WeaponFactoryDto {
    const id = this.form.controls['weaponFactory'].value;

    return <WeaponFactoryDto>(
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
}
