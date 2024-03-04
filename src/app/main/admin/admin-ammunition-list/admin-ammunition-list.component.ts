import { Component, inject, OnInit, signal } from '@angular/core';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { AmmunitionAddComponent } from '../../ammunition/ammunition-add/ammunition-add.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { AccordionModule } from 'primeng/accordion';

import { TabViewModule } from 'primeng/tabview';
import { CaliberTableListComponent } from '../../caliber/caliber-table-list/caliber-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { AmmunitionWeightListComponent } from '../../ammunition/ammunition-weight-list/ammunition-weight-list.component';

@Component({
  selector: 'app-admin-ammunition-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    AmmunitionAddComponent,
    AccordionModule,
    TabViewModule,
    CaliberTableListComponent,
    FactoryTableListComponent,
    RouterLink,
    CaliberDropdownComponent,
    AmmunitionWeightListComponent
  ],
  templateUrl: './admin-ammunition-list.component.html',
  styleUrl: './admin-ammunition-list.component.scss'
})
export class AdminAmmunitionListComponent implements OnInit {
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
  private ammunition: AmmunitionDto[] = [];
  public filteredAmmunition: AmmunitionDto[] = [];
  public newAmmunitionForm: boolean = false;
  public currentCaliberId = signal(0);
  public totalAmmunition = signal(0);
  ngOnInit(): void {
    this.loadAmmunition();
  }

  private loadAmmunition(): void {
    this.ammunitionService.getAllAmmunition().subscribe({
      next: (data) => {
        this.ammunition = data;
        this.filteredAmmunition = data;
        this.totalAmmunition.set(data.length);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public addAmmunition(): void {
    this.newAmmunitionForm = !this.newAmmunitionForm;
  }

  public newAmmunition(newAmmunition: AmmunitionDto): void {
    this.ammunition.push(newAmmunition);
    this.newAmmunitionForm = false;
  }

  public filterByCaliber(id: number): void {
    this.filteredAmmunition = this.ammunition.filter(
      (ammo) => ammo.caliber.id === id
    );
    this.totalAmmunition.set(this.filteredAmmunition.length);
  }
}
