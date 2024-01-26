import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
    WeaponAddComponent
  ],
  templateUrl: './user-weapon-setup-add.component.html',
  styleUrl: './user-weapon-setup-add.component.scss'
})
export class UserWeaponSetupAddComponent implements OnInit {
  private weapons: WeaponDto[] = [];
  public weaponFactories: WeaponFactoryDto[] = [];
  public weaponFactorySelected: boolean = false;
  public weaponsWM: WeaponsWM[] = [];
  public form: FormGroup;
  public isNewWeapon: boolean = false;
  constructor(
    private readonly weaponService: WeaponService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      weaponFactory: [0, Validators.required],
      weaponModel: ['', Validators.required],
      weaponNotFound: [false]
    });
  }

  public ngOnInit(): void {
    this.loadWeaponsList();
  }

  private loadWeaponsList() {
    this.weaponService.getAllWeapon().subscribe({
      next: (data) => {
        this.weapons = data;
        this.createWeaponFactoriesDropdown(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public selectWeaponFactory($event: number): void {
    if ($event > 0) {
      this.createWeaponViewModel($event);
      this.weaponFactorySelected = true;
    }

    if ($event === -1) {
      console.log('add factory');
    }
  }

  public createWeaponFactoriesDropdown(weapons: WeaponDto[]): void {
    this.weaponFactories = [];

    for (const weapon of weapons) {
      const factory: WeaponFactoryDto = weapon.factory;
      this.weaponFactories.push(factory);
    }
  }

  public createWeaponViewModel(id: number) {
    const selectedFactory = this.weapons.filter(
      (weapon) => weapon.factory.id === id
    );

    this.weaponsWM = selectedFactory.map((weapon) => {
      return {
        id: weapon.id,
        model: weapon.model
      };
    });
  }

  public newWeaponForm(checked: boolean) {
    this.isNewWeapon = checked;
  }

  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    this.createWeaponFactoriesDropdown(this.weapons);
    this.isNewWeapon = false;
  }
}
