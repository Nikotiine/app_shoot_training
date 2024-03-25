import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { OpticsFormComponent } from '../../optics/optics-form/optics-form.component';
import { TabViewModule } from 'primeng/tabview';
import { FactoryFormComponent } from '../../factory/factory-form/factory-form.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';

import { OpticsListComponent } from '../../optics/optics-list/optics-list.component';

@Component({
  selector: 'app-optics-tabview',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    OpticsFormComponent,
    TabViewModule,
    FactoryFormComponent,
    FactoryTableListComponent,
    RouterLink,
    OpticsListComponent
  ],
  templateUrl: './optics-tabview.component.html',
  styleUrl: './optics-tabview.component.scss'
})
export class OpticsTabviewComponent {
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
