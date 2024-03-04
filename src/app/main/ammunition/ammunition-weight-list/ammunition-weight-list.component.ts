import { Component, inject } from '@angular/core';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-ammunition-weight-list',
  standalone: true,
  imports: [
    CaliberDropdownComponent,
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule
  ],
  templateUrl: './ammunition-weight-list.component.html',
  styleUrl: './ammunition-weight-list.component.scss'
})
export class AmmunitionWeightListComponent {
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  public weights: AmmunitionWeightDto[] = [];

  public loadAmmunitionWeights(id: number) {
    this.ammunitionService
      .getWeightByCaliber({
        id: id
      })
      .subscribe({
        next: (weights) => {
          this.weights = weights;
        },
        error: (err) => {
          inject(CustomMessageService).errorMessage(
            'Poids des munitions',
            err.error.message
          );
        }
      });
  }

  confirm($event: Event, id: number) {
    console.log($event);
    console.log(id);
  }
}
