import { Component, inject, OnInit } from '@angular/core';
import { OpticsService } from '../../../core/api/services/optics.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { OpticsDto } from '../../../core/api/models/optics-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { OpticsAddComponent } from '../../optics/optics-add/optics-add.component';
import { TabViewModule } from 'primeng/tabview';
import { FactoryAddComponent } from '../../factory/factory-add/factory-add.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-optics-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    OpticsAddComponent,
    TabViewModule,
    FactoryAddComponent,
    FactoryTableListComponent,
    RouterLink
  ],
  templateUrl: './admin-optics-list.component.html',
  styleUrl: './admin-optics-list.component.scss'
})
export class AdminOpticsListComponent implements OnInit {
  private readonly opticsService: OpticsService = inject(OpticsService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  public optics: OpticsDto[] = [];
  public visible: boolean = false;
  public ngOnInit(): void {
    this.loadOptics();
  }

  private loadOptics(): void {
    this.opticsService.getAllOptics().subscribe({
      next: (optics) => {
        this.optics = optics;
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public add(): void {
    this.visible = !this.visible;
  }

  public opticAdded(newOptics: OpticsDto): void {
    this.optics.push(newOptics);
    this.visible = false;
  }

  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
}
