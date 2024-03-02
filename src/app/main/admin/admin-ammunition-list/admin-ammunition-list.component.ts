import { Component, inject, OnInit } from '@angular/core';
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
import { CaliberTableListComponent } from '../caliber-table-list/caliber-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './admin-ammunition-list.component.html',
  styleUrl: './admin-ammunition-list.component.scss'
})
export class AdminAmmunitionListComponent implements OnInit {
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  public ammunition: AmmunitionDto[] = [];
  public newAmmunitionForm: boolean = false;

  ngOnInit(): void {
    this.loadAmmunition();
  }

  private loadAmmunition(): void {
    this.ammunitionService.getAllAmmunition().subscribe({
      next: (data) => {
        this.ammunition = data;
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

  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
