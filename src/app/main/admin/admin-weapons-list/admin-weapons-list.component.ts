import { Component, inject, OnInit } from '@angular/core';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-admin-weapons-list',
  standalone: true,
  imports: [ButtonModule, DatePipe, SharedModule, TableModule],
  templateUrl: './admin-weapons-list.component.html',
  styleUrl: './admin-weapons-list.component.scss'
})
export class AdminWeaponsListComponent implements OnInit {
  private readonly weaponService: WeaponService = inject(WeaponService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  public weapons: WeaponDto[] = [];
  ngOnInit(): void {
    this.loadWeapons();
  }

  private loadWeapons(): void {
    this.weaponService.getAllWeapon().subscribe({
      next: (weapons) => {
        console.log(weapons);
        this.weapons = weapons;
      },
      error: (err) => {
        console.log(err);
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }
}
