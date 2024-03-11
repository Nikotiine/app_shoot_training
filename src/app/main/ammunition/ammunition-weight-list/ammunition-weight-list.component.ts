import { Component, inject, signal } from '@angular/core';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { AmmunitionWeightAddComponent } from '../ammunition-weight-add/ammunition-weight-add.component';

@Component({
  selector: 'app-ammunition-weight-list',
  standalone: true,
  imports: [
    CaliberDropdownComponent,
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    AmmunitionWeightAddComponent
  ],
  templateUrl: './ammunition-weight-list.component.html',
  styleUrl: './ammunition-weight-list.component.scss'
})
export class AmmunitionWeightListComponent {
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  public weights: AmmunitionWeightDto[] = [];
  public visible: boolean = false;
  public result = signal(0);
  public disableDropdown = signal(false);
  public loadAmmunitionWeights(id: number) {
    this.ammunitionService
      .getWeightByCaliber({
        id: id
      })
      .subscribe({
        next: (weights) => {
          this.weights = weights;
          this.result.set(weights.length);
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
  public add(): void {
    this.visible = !this.visible;
    this.disableDropdown.set(this.visible);
  }

  public newWeight(weight: AmmunitionWeightDto): void {
    this.weights.push(weight);
    this.add();
  }
}
