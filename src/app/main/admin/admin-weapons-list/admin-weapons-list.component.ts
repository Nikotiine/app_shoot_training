import { Component, inject, OnInit } from '@angular/core';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { WeaponAddComponent } from '../../weapon/weapon-add/weapon-add.component';

@Component({
  selector: 'app-admin-weapons-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    WeaponAddComponent
  ],
  templateUrl: './admin-weapons-list.component.html',
  styleUrl: './admin-weapons-list.component.scss'
})
export class AdminWeaponsListComponent implements OnInit {
  private readonly weaponService: WeaponService = inject(WeaponService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  public weapons: WeaponDto[] = [];
  public visible: boolean = false;
  ngOnInit(): void {
    this.loadWeapons();
  }

  private loadWeapons(): void {
    this.weaponService.getAllWeapon().subscribe({
      next: (weapons) => {
        this.weapons = weapons;
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public add(): void {
    this.visible = !this.visible;
  }

  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    this.visible = false;
  }
}
