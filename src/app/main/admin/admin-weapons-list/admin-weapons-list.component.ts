import { Component, inject, OnInit } from '@angular/core';
import { WeaponService } from '../../../core/api/services/weapon.service';

@Component({
  selector: 'app-admin-weapons-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-weapons-list.component.html',
  styleUrl: './admin-weapons-list.component.scss'
})
export class AdminWeaponsListComponent implements OnInit {
  private readonly weaponService: WeaponService = inject(WeaponService);
  ngOnInit(): void {
    this.loadWeapons();
  }

  private loadWeapons(): void {
    this.weaponService.getAllWeapon().subscribe({
      next: (weapons) => {
        console.log(weapons);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
