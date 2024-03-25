import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { AmmunitionFormComponent } from '../ammunition-form/ammunition-form.component';
import { ButtonModule } from 'primeng/button';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';

@Component({
  selector: 'app-ammunition-list',
  standalone: true,
  imports: [
    AmmunitionFormComponent,
    ButtonModule,
    CaliberDropdownComponent,
    DatePipe,
    SharedModule,
    TableModule
  ],
  templateUrl: './ammunition-list.component.html',
  styleUrl: './ammunition-list.component.scss'
})
export class AmmunitionListComponent implements OnInit {
  // Private field
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  private _ammunition: AmmunitionDto[] = [];
  private readonly _currentPageMessageHeader: string =
    'Administration des munitions';
  // Public field
  public currentCaliberId = signal(0);
  public totalAmmunition = signal(0);
  public selectedAmmunition: WritableSignal<AmmunitionDto | null> =
    signal(null);
  public filteredAmmunition: AmmunitionDto[] = [];
  public isShowFormComponent: boolean = false;

  ngOnInit(): void {
    this.loadAmmunition();
  }

  /**
   * Charge la liste des munitions disponibles
   */
  private loadAmmunition(): void {
    this.ammunitionService.getAllAmmunition().subscribe({
      next: (data) => {
        this._ammunition = data;
        this.filteredAmmunition = data;
        this.totalAmmunition.set(data.length);
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
   * Filtre les munitions par calibre
   * @param id du calibre
   */
  public filterByCaliber(id: number): void {
    this.filteredAmmunition = this._ammunition.filter(
      (ammo) => ammo.caliber.id === id
    );
    this.totalAmmunition.set(this.filteredAmmunition.length);
  }

  /**
   * Pop-up de confirmation de suppression de la munition
   * @param event Event
   * @param ammo AmmunitionDto
   */
  public async confirm(event: Event, ammo: AmmunitionDto): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Supprimer cette munition ?',
      this._currentPageMessageHeader
    );
    if (confirmed) {
      this.disableAmmunition(ammo);
    }
  }

  /**
   * Soumission du formulaire de suppression de la munition
   * @param ammo AmmunitionDto
   */
  private disableAmmunition(ammo: AmmunitionDto) {
    this.ammunitionService
      .disableAmmunition({
        id: ammo.id
      })
      .subscribe({
        next: (res) => {
          this._ammunition = res;
          this.filterByCaliber(ammo.caliber.id);
          this.currentCaliberId.set(ammo.caliber.id);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }
  public showEditForm(ammunition: AmmunitionDto): void {
    this.isShowFormComponent = !this.isShowFormComponent;
    this.selectedAmmunition.set(ammunition);
  }
  public showAddForm(): void {
    if (this.isShowFormComponent) {
      this.selectedAmmunition.set(null);
    }
    this.isShowFormComponent = !this.isShowFormComponent;
  }

  /**
   * Mise a jour de la liste apres ajout d'une munition
   * @param ammunition AmmunitionDto
   */
  public addedEvent(ammunition: AmmunitionDto): void {
    this._ammunition.push(ammunition);
    this.filterByCaliber(ammunition.caliber.id);
    this.isShowFormComponent = false;
  }

  /**
   * Mise a jour de la liste apres edition de la munition
   * @param ammunition AmmunitionDto
   */
  public editedEvent(ammunition: AmmunitionDto): void {
    const index = this._ammunition.findIndex(
      (ammo) => ammo.id === ammunition.id
    );
    this._ammunition.splice(index, 1);
    this._ammunition.push(ammunition);
    this.filterByCaliber(ammunition.caliber.id);
    this.isShowFormComponent = !this.isShowFormComponent;
    this.selectedAmmunition.set(null);
  }
}
