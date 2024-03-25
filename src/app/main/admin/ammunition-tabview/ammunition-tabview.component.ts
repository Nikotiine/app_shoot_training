import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AmmunitionFormComponent } from '../../ammunition/ammunition-form/ammunition-form.component';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { CaliberTableListComponent } from '../../caliber/caliber-table-list/caliber-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { AmmunitionWeightListComponent } from '../../ammunition/ammunition-weight-list/ammunition-weight-list.component';
import { AmmunitionListComponent } from '../../ammunition/ammunition-list/ammunition-list.component';

@Component({
  selector: 'app-ammunition-tabview',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    AmmunitionFormComponent,
    AccordionModule,
    TabViewModule,
    CaliberTableListComponent,
    FactoryTableListComponent,
    RouterLink,
    CaliberDropdownComponent,
    AmmunitionWeightListComponent,
    AmmunitionListComponent
  ],
  templateUrl: './ammunition-tabview.component.html',
  styleUrl: './ammunition-tabview.component.scss'
})
export class AmmunitionTabviewComponent {
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
