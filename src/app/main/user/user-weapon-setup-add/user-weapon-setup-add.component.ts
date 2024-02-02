import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { WeaponFactoryDto } from '../../../core/api/models/weapon-factory-dto';
import { InputSwitchModule } from 'primeng/inputswitch';
import { WeaponAddComponent } from '../../weapon/weapon-add/weapon-add.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { OpticsService } from '../../../core/api/services/optics.service';
import { OpticsDto } from '../../../core/api/models/optics-dto';
import { OpticsFactoryDto } from '../../../core/api/models/optics-factory-dto';
import { OpticsAddComponent } from '../../optics/optics-add/optics-add.component';

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
    WeaponAddComponent,
    OpticsAddComponent
  ],
  templateUrl: './user-weapon-setup-add.component.html',
  styleUrl: './user-weapon-setup-add.component.scss'
})
export class UserWeaponSetupAddComponent implements OnInit {
  private weapons: WeaponDto[] = [];
  private optics: OpticsDto[] = [];
  public weaponFactories: WeaponFactoryDto[] = [];
  public opticsFactories: OpticsFactoryDto[] = [];
  public weaponsWM: DropdownViewModel[] = [];
  public opticsWM: DropdownViewModel[] = [];
  public form: FormGroup;
  public isNewWeapon: boolean = false;
  public isNewOptics: boolean = false;

  constructor(
    private readonly weaponService: WeaponService,
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly opticsService: OpticsService
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
      opticsNotFound: [false]
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
    this.weaponService.getAllWeapon().subscribe({
      next: (data) => {
        this.weapons = data;
        this.createWeaponFactoriesDropdown(data);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Mon compte', err.error.message);
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
      const factory: WeaponFactoryDto = weapon.factory;
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

  private loadOpticsList() {
    this.opticsService.getAllOptics().subscribe({
      next: (optics) => {
        console.log(optics);
        this.optics = optics;
        this.createOpticsFactoriesDropdown(optics);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private createOpticsViewModel(id: number): void {
    const selectedFactory = this.optics.filter(
      (optic) => optic.factory.id === id
    );

    this.opticsWM = selectedFactory.map((optic) => {
      return {
        id: optic.id,
        model: `${optic.name} ${optic.minZoom}-${optic.maxZoom}X${optic.outletDiameter.diameter} - ${optic.focalPlane.focalPlane}`
      };
    });
  }
  private createOpticsFactoriesDropdown(optics: OpticsDto[]): void {
    this.opticsFactories = [];

    for (const optic of optics) {
      const factory: OpticsFactoryDto = optic.factory;
      this.opticsFactories.push(factory);
    }
  }

  public newOpticsForm(checked: boolean): void {
    this.isNewOptics = checked;
    this.switchStateFormControl('optic', checked);
  }

  public opticsAdded(newOptics: OpticsDto): void {
    this.optics.push(newOptics);
    this.createOpticsFactoriesDropdown(this.optics);
    this.isNewOptics = false;
    this.form.controls['opticsNotFound'].setValue(false);
  }

  public selectOpticsFactory(factoryId: number): void {
    this.createOpticsViewModel(factoryId);
    this.form.controls['opticModel'].enable();
  }

  //************************************ COMMON ************************************
  private switchStateFormControl(type: string, newItem: boolean) {
    if (!newItem) {
      this.form.controls[type + 'Factory'].enable();
      this.form.controls[type + 'Model'].enable();
    } else {
      this.form.controls[type + 'Factory'].disable();
      this.form.controls[type + 'Model'].disable();
    }
  }
}
