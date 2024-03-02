import { Component, inject, OnInit } from '@angular/core';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { WeaponAddComponent } from '../../weapon/weapon-add/weapon-add.component';
import { TabViewModule } from 'primeng/tabview';
import { forkJoin } from 'rxjs';
import { CaliberTableListComponent } from '../caliber-table-list/caliber-table-list.component';
import { FactoryTableListComponent } from '../factory-table-list/factory-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-weapons-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    WeaponAddComponent,
    TabViewModule,
    CaliberTableListComponent,
    FactoryTableListComponent,
    RouterLink
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
  public factories: FactoryDto[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin([
      this.weaponService.getAllWeapon(),
      this.weaponService.getAllWeaponFactory()
    ]).subscribe({
      next: (data) => {
        this.weapons = data[0];
        this.factories = data[1];
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

  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
