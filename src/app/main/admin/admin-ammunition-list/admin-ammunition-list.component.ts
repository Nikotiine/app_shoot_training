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
import { forkJoin } from 'rxjs';
import { AmmunitionFactoryDto } from '../../../core/api/models/ammunition-factory-dto';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';

@Component({
  selector: 'app-admin-ammunition-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    AmmunitionAddComponent,
    AccordionModule
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
  public ammunitionFactories: AmmunitionFactoryDto[] = [];
  ngOnInit(): void {
    this.loadAmmunition();
  }

  private loadAmmunition(): void {
    forkJoin([
      this.ammunitionService.getAllAmmunition(),
      this.ammunitionService.getAllFactories()
    ]).subscribe({
      next: (data) => {
        this.ammunition = data[0];
        this.ammunitionFactories = data[1];
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
}
