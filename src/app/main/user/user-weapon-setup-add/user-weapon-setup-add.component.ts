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

export interface WeaponsWM {
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
  public weaponsWM: WeaponsWM[] = [];
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
      )
    });
  }

  public ngOnInit(): void {
    this.loadWeaponsList();
  }

  private loadWeaponsList(): void {
    this.weaponService.getAllWeapon().subscribe({
      next: (data) => {
        this.weapons = data;
        this.createWeaponFactoriesDropdown(data);
      },
      error: (err) => {
        console.log(err);
        this.customMessageService.errorMessage('Mon compte', err.error.message);
      }
    });
  }

  public selectWeaponFactory(factoryId: number): void {
    this.createWeaponViewModel(factoryId);
    this.form.controls['weaponModel'].enable();
  }

  private createWeaponFactoriesDropdown(weapons: WeaponDto[]): void {
    this.weaponFactories = [];

    for (const weapon of weapons) {
      const factory: WeaponFactoryDto = weapon.factory;
      this.weaponFactories.push(factory);
    }
  }

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

  public newWeaponForm(checked: boolean): void {
    this.isNewWeapon = checked;
    checked
      ? this.form.controls['weaponFactory'].disable()
      : this.form.controls['weaponFactory'].enable();
  }

  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    this.createWeaponFactoriesDropdown(this.weapons);
    this.isNewWeapon = false;
    this.form.controls['weaponNotFound'].setValue(false);
  }

  public weaponSelected(): void {
    this.form.controls['opticFactory'].enable();
    this.loadOpticsList();
  }

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

  private createOpticsFactoriesDropdown(optics: OpticsDto[]): void {
    this.weaponFactories = [];

    for (const optic of optics) {
      const factory: OpticsFactoryDto = optic.factory;
      this.opticsFactories.push(factory);
    }
  }

  newOpticsForm(checked: boolean) {
    console.log(checked);
    this.isNewOptics = checked;
  }
}
