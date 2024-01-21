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
    const notFoundMyWeaponFactory: WeaponFactoryDto = {
      id: -1,
      name: 'Choisir une autre marque'
    };
    for (const weapon of weapons) {
      const factory: WeaponFactoryDto = weapon.factory;
      this.weaponFactories.push(factory);
    }
    this.weaponFactories.push(notFoundMyWeaponFactory);
  }

  public createWeaponViewModel(id: number) {
    console.log(this.weapons);
    const selectedFactory = this.weapons.filter(
      (weapon) => weapon.factory.id === id
    );
    console.log(selectedFactory);
    const weaponModelNotFound: WeaponsWM = {
      id: -1,
      model: 'Pas dans la liste'
    };
    this.weaponsWM = selectedFactory.map((weapon) => {
      return {
        id: weapon.id,
        model: weapon.model
      };
    });
    this.weaponsWM.push(weaponModelNotFound);
  }

  public newWeaponForm(checked: boolean) {
    this.isNewWeapon = checked;
  }
}
