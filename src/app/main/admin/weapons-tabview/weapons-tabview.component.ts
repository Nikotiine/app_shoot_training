import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { WeaponFormComponent } from '../../weapon/weapon-form/weapon-form.component';
import { TabViewModule } from 'primeng/tabview';

import { CaliberTableListComponent } from '../../caliber/caliber-table-list/caliber-table-list.component';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';

import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';

import { WeaponListComponent } from '../../weapon/weapon-list/weapon-list.component';

@Component({
  selector: 'app-weapons-tabview',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    WeaponFormComponent,
    TabViewModule,
    CaliberTableListComponent,
    FactoryTableListComponent,
    RouterLink,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CaliberDropdownComponent,
    WeaponListComponent
  ],
  templateUrl: './weapons-tabview.component.html',
  styleUrl: './weapons-tabview.component.scss'
})
export class WeaponsTabviewComponent {
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
