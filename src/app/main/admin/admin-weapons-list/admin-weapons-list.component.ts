import { Component, inject, OnInit, signal } from '@angular/core';
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
import { CaliberTableListComponent } from '../../caliber/caliber-table-list/caliber-table-list.component';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';
import { FactoryService } from '../../../core/api/services/factory.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';

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
    RouterLink,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CaliberDropdownComponent
  ],
  templateUrl: './admin-weapons-list.component.html',
  styleUrl: './admin-weapons-list.component.scss'
})
export class AdminWeaponsListComponent implements OnInit {
  private readonly weaponService: WeaponService = inject(WeaponService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly factoryService: FactoryService = inject(FactoryService);

  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
  public weapons: WeaponDto[] = [];
  public filteredWeapons: WeaponDto[] = [];
  public newWeaponForm: boolean = false;
  public factories: FactoryDto[] = [];

  public currentCaliberId = signal(0);

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les donnees necessaire a l'effichage de la page
   */
  private loadData(): void {
    forkJoin([
      this.weaponService.getAllWeapon(),
      this.factoryService.getAllFactoryByType({
        type: FactoryType.WEAPON
      })
    ]).subscribe({
      next: (data) => {
        this.weapons = data[0];
        this.filteredWeapons = data[0];

        this.factories = data[1];
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public add(): void {
    this.newWeaponForm = !this.newWeaponForm;
  }

  /**
   *
   * Lors qu'une nouvelle arme est enregister en bdd l'ajoute a la liste des armes
   * @param newWeapon WeaponDto
   */
  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    const caliberId = newWeapon.caliber.id;
    this.filterByCaliber(caliberId);
    this.currentCaliberId.set(caliberId);
    this.newWeaponForm = false;
  }

  /**
   * Filtre les armes affocher par calibre
   * @param id
   */
  public filterByCaliber(id: number): void {
    this.filteredWeapons = this.weapons.filter((w) => w.caliber.id === id);
  }
}
