import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { AmmunitionWeightFormComponent } from '../ammunition-weight-form/ammunition-weight-form.component';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-ammunition-weight-list',
  standalone: true,
  imports: [
    CaliberDropdownComponent,
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    AmmunitionWeightFormComponent
  ],
  templateUrl: './ammunition-weight-list.component.html',
  styleUrl: './ammunition-weight-list.component.scss'
})
export class AmmunitionWeightListComponent implements OnInit {
  // Private field
  private readonly _currentPageMessageHeader: string = 'Poids des munitions';

  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  // Public field
  public filteredWeights: AmmunitionWeightDto[] = [];
  public weights: AmmunitionWeightDto[] = [];
  public isShowForm: boolean = false;
  public result: WritableSignal<number> = signal(0);
  public disableDropdown: WritableSignal<boolean> = signal(false);
  public selectedCaliberId: WritableSignal<number> = signal(0);
  public selectedWeight: WritableSignal<AmmunitionWeightDto | null> =
    signal(null);
  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Popup de confirmation de suppression du poids selectioner
   * @param $event Event
   * @param weight AmmunitionWeightDto
   */
  public async confirm(
    $event: Event,
    weight: AmmunitionWeightDto
  ): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      $event,
      'Desactiver ce poids ?',
      this._currentPageMessageHeader
    );
    if (confirmed) {
      this.disableAmmunitionWeight(weight);
    }
  }

  /**
   * Affiche le formulaire d'ajout d'un nouveau poids
   */
  public showAddForm(): void {
    if (this.isShowForm) {
      this.selectedWeight.set(null);
    }
    this.isShowForm = !this.isShowForm;
    this.disableDropdown.set(this.isShowForm);
  }

  /**
   * Mise a jouir de la liste des poids suite a l'ajout d'un nouveau
   * Filtre la liste en fonction du dernier filtre choisi
   * @param weight AmmunitionWeightDto
   */
  public addedEvent(weight: AmmunitionWeightDto): void {
    this.filteredWeights.push(weight);
    this.filterByCaliber(this.selectedCaliberId());
    this.showAddForm();
  }

  /**
   * Sousmission du formulaire de desactivation du poids
   * @param weight AmmunitionWeightDto
   */
  private disableAmmunitionWeight(weight: AmmunitionWeightDto): void {
    this.ammunitionService
      .disableAmmunitionWeight({
        id: weight.id
      })
      .subscribe({
        next: (data) => {
          this.weights = data;
          this.filterByCaliber(this.selectedCaliberId());
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  /**
   * Filtre les poids par calibre
   * @param id du calibre
   */
  public filterByCaliber(id: number): void {
    this.selectedCaliberId.set(id);
    if (id === 0) {
      this.filteredWeights = this.weights;
    } else {
      this.filteredWeights = this.weights.filter((weight) => {
        return weight.calibers.find((caliber) => caliber.id === id);
      });
    }

    this.result.set(this.filteredWeights.length);
  }

  /**
   * Charge les poids a l'init du template
   */
  private loadData(): void {
    this.ammunitionService.getAllWeight().subscribe({
      next: (data) => {
        this.filteredWeights = data;
        this.weights = data;
        this.result.set(data.length);
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this._currentPageMessageHeader,
          err.error.message
        );
      }
    });
  }

  /**
   * Affiche le formulaire d'edition d'un poids (ajout d'un calibre uniquement)
   * @param weight AmmunitionWeightDto
   */
  public showEditForm(weight: AmmunitionWeightDto): void {
    this.isShowForm = !this.isShowForm;
    this.disableDropdown.set(this.isShowForm);
    this.selectedWeight.set(weight);
  }

  /**
   * Mise a jour de la liste des poids suite a l'edition
   * Reset du signal selectedWeight
   * Reactivation du dropdown de tri de calibre
   * @param weight AmmunitionWeightDto
   */
  public editedEvent(weight: AmmunitionWeightDto): void {
    const index = this.weights.findIndex((w) => w.id === weight.id);
    this.weights.splice(index, 1);
    this.weights.push(weight);
    this.filterByCaliber(this.selectedCaliberId());
    this.isShowForm = false;
    this.disableDropdown.set(false);
    this.selectedWeight.set(null);
  }
}
