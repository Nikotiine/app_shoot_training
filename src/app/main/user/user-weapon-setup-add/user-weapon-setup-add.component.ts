import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { WeaponDto } from '../../../core/api/models/weapon-dto';

import { InputSwitchModule } from 'primeng/inputswitch';
import { WeaponFormComponent } from '../../weapon/weapon-form/weapon-form.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

import { OpticsDto } from '../../../core/api/models/optics-dto';

import { OpticsFormComponent } from '../../optics/optics-form/optics-form.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { UserService } from '../../../core/app/services/user.service';

import { UserWeaponSetupDto } from '../../../core/api/models/user-weapon-setup-dto';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { UserWeaponSetupCreateDto } from '../../../core/api/models/user-weapon-setup-create-dto';
import { UserSetupService } from '../../../core/app/services/user-setup.service';

export interface DropdownViewModel {
  id: number;
  model: string;
}
@Component({
  selector: 'app-user-weapon-setup-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputSwitchModule,
    WeaponFormComponent,
    OpticsFormComponent,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './user-weapon-setup-add.component.html',
  styleUrl: './user-weapon-setup-add.component.scss'
})
export class UserWeaponSetupAddComponent implements OnInit {
  // Private field
  private readonly userSetupService: UserSetupService =
    inject(UserSetupService);

  @Output() setupAdded: EventEmitter<UserWeaponSetupDto> =
    new EventEmitter<UserWeaponSetupDto>();

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  private weapons: WeaponDto[] = [];
  private optics: OpticsDto[] = [];
  public weaponFactories: FactoryDto[] = [];
  public opticsFactories: FactoryDto[] = [];
  public weaponsWM: DropdownViewModel[] = [];
  public opticsWM: DropdownViewModel[] = [];
  public form: FormGroup;
  public isNewWeapon: boolean = false;
  public isNewOptics: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly appUserService: UserService
  ) {
    this.form = this.fb.group({
      weaponFactory: [0, Validators.required],
      weaponModel: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      weaponNotFound: [false],
      opticFactory: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      opticModel: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      opticsNotFound: [false],
      slopeRail: [0]
    });
  }

  public ngOnInit(): void {
    this.loadWeaponsList();
  }

  //************************************ WEAPON ************************************

  /**
   * Charge la liste des armes disponible en bdd et creer le dropdown pour le choix de la marque de l'arme
   */
  private loadWeaponsList(): void {
    this.userSetupService.getAllWeapons().subscribe({
      next: (data) => {
        this.weapons = data;
        this.createWeaponFactoriesDropdown(data);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Liste Arme', err.error.message);
      }
    });
  }

  /**
   * Creer le dropdown pour le choix de la maruqe de l'arme
   * @param weapons WeaponDto[]
   */
  private createWeaponFactoriesDropdown(weapons: WeaponDto[]): void {
    this.weaponFactories = [];

    for (const weapon of weapons) {
      const factory: FactoryDto = weapon.factory;
      this.weaponFactories.push(factory);
    }
  }

  /**
   * Quand la marque ete selectionné
   * - Active le dropdown des model
   * - Cré le view model pour le drop
   * @param factoryId id de la marque
   */
  public selectWeaponFactory(factoryId: number): void {
    this.createWeaponViewModel(factoryId);
    this.form.controls['weaponModel'].enable();
  }

  /**
   * Transforme l'objet weapon en DropdownViewModel , concatene le nom de l'arme et sa version
   * @param id de la marque
   */
  private createWeaponViewModel(id: number): void {
    const selectedFactory = this.weapons.filter(
      (weapon) => weapon.factory.id === id
    );

    this.weaponsWM = selectedFactory.map((weapon) => {
      return {
        id: weapon.id,
        model: weapon.model + ' - ' + weapon.variation
      };
    });
  }

  /**
   * Si l'utilisateur ne trouve pas son model, affiche le formulaiore de creation d'un nouveau model et desactive les dropdown
   * @param checked event du inputSwitch
   */
  public newWeaponForm(checked: boolean): void {
    this.isNewWeapon = checked;
    this.switchStateFormControl('weapon', checked);
  }

  /**
   * Une fois le nouveau model enregistre en bdd il est ajoute a la liste prive des arme et refrachi le dropdown des marque
   * Ferme le formulaire de creation d'une nouvelle arme et remet le inputSwitch a false
   * @param newWeapon WeaponDto
   */
  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    this.createWeaponFactoriesDropdown(this.weapons);
    this.isNewWeapon = false;
    this.switchStateFormControl('weapon', false);
    this.form.controls['weaponNotFound'].setValue(false);
  }

  /**
   * Quand l'arme est choisi active le dropdown du choix de la marque de l'optique et charge la liste des optique disponible en bdd
   */
  public weaponSelected(): void {
    this.form.controls['opticFactory'].enable();
    this.loadOpticsList();
  }

  //************************************ OPTICS ************************************

  /**
   * Charge la liste des optiques disponible apres que l'utilisateur est choisi son arme
   */
  private loadOpticsList(): void {
    this.userSetupService.getAllActivesOptics().subscribe({
      next: (optics) => {
        this.optics = optics;
        this.createOpticsFactoriesDropdown(optics);
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          'Liste optiques',
          err.error.message
        );
      }
    });
  }

  /**
   * Creer le dropdown avec la liste des marques d'optiques
   * @param optics OpticsDto[]
   */
  private createOpticsFactoriesDropdown(optics: OpticsDto[]): void {
    this.opticsFactories = [];

    for (const optic of optics) {
      const factory: FactoryDto = optic.factory;
      this.opticsFactories.push(factory);
    }
  }

  /**
   * Transforme l'objet optics en DropdownViewModel , concatene le nom de le nom du model avec
   * son zoom min / zoom maxi X diametre externe et plan focal
   * @param id de la marque
   */
  private createOpticsViewModel(id: number): void {
    const selectedFactory = this.optics.filter(
      (optic) => optic.factory.id === id
    );

    this.opticsWM = selectedFactory.map((optic) => {
      return {
        id: optic.id,
        model: `${optic.name} ${optic.minZoom}-${optic.maxZoom}X${optic.outletDiameter.label} - ${optic.focalPlane.label}`
      };
    });
  }

  /**
   * Si l'utilisateur ne trouve pas son model, affiche le formulaiore de creation d'un nouveau model et desactive les dropdown
   * @param checked event du inputSwitch
   */
  public newOpticsForm(checked: boolean): void {
    this.isNewOptics = checked;
    this.switchStateFormControl('optic', checked);
  }

  /**
   * Une fois le nouveau model enregistre en bdd il est ajoute a la liste prive des optiques et refrachi le dropdown des marque
   * Ferme le formulaire de creation d'une nouvelle optique et remet le inputSwitch a false
   * @param newOptics OpticsDto
   */
  public opticsAdded(newOptics: OpticsDto): void {
    this.optics.push(newOptics);
    this.createOpticsFactoriesDropdown(this.optics);
    this.isNewOptics = false;
    this.switchStateFormControl('optic', false);
    this.form.controls['opticsNotFound'].setValue(false);
  }

  /**
   * Une fois la marque d'optique choisie creer et active le dropdown des model d'optique
   * @param factoryId id de la marque
   */
  public selectOpticsFactory(factoryId: number): void {
    this.createOpticsViewModel(factoryId);
    this.form.controls['opticModel'].enable();
  }

  //************************************ COMMON ************************************

  /**
   * Active ou desactive les dropdown
   * @param type weapon ou factory
   * @param newItem si l'utlisateur switch sur "je trouve pas mon model"
   */
  private switchStateFormControl(type: string, newItem: boolean) {
    if (!newItem) {
      this.form.controls[type + 'Factory'].enable();
      this.form.controls[type + 'Model'].enable();
    } else {
      this.form.controls[type + 'Factory'].disable();
      this.form.controls[type + 'Model'].disable();
    }
  }

  public submit(): void {
    const user = this.appUserService.getProfile();
    if (user) {
      const newSetup: UserWeaponSetupCreateDto = {
        weapon: this.getSelectedWeapon(),
        optics: this.getSelectedOptics(),
        slopeRail: this.form.controls['slopeRail'].value,
        soundReducer: undefined,
        user: user
      };

      this.userSetupService.save(newSetup).subscribe({
        next: (res) => {
          this.setupAdded.emit(res);
          this.customMessageService.successMessage(
            'Setup service',
            'Nouveau setup enregistré'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            'Setup service',
            err.error.message
          );
        }
      });
    }
  }

  private getSelectedWeapon(): WeaponDto {
    const weaponId = this.form.controls['weaponModel'].value;

    return <WeaponDto>this.weapons.find((weapon) => weapon.id === weaponId);
  }

  private getSelectedOptics() {
    const opticsId = this.form.controls['opticModel'].value;
    return <OpticsDto>this.optics.find((optics) => optics.id === opticsId);
  }

  onCancel() {
    this.cancel.emit();
  }
}
