import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { FactoryService } from '../../../core/api/services/factory.service';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { ButtonModule } from 'primeng/button';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { WeaponFormComponent } from '../weapon-form/weapon-form.component';

@Component({
  selector: 'app-weapon-list',
  standalone: true,
  imports: [
    ButtonModule,
    CaliberDropdownComponent,
    DatePipe,
    SharedModule,
    TableModule,
    WeaponFormComponent
  ],
  templateUrl: './weapon-list.component.html',
  styleUrl: './weapon-list.component.scss'
})
export class WeaponListComponent implements OnInit {
  // Private field
  private readonly weaponService: WeaponService = inject(WeaponService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  private readonly _currentPageMessageHeader: string =
    'Administration des armes';
  private _weapons: WeaponDto[] = [];
  // Public field

  public filteredWeapons: WeaponDto[] = [];
  public isShowFormComponent: boolean = false;
  public factories: FactoryDto[] = [];
  public currentCaliberId = signal(0);
  public selectedWeapon: WritableSignal<WeaponDto | null> = signal(null);
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les donnees necessaire a l'effichage de la page
   */
  private loadData(): void {
    forkJoin([
      this.weaponService.getAllWeapon(),
      this.factoryService.getAllFactoryByType({
        type: FactoryType.WEAPON
      })
    ]).subscribe({
      next: (data) => {
        this._weapons = data[0];
        this.filteredWeapons = data[0];
        this.factories = data[1];
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
   * Affiche ou masque le formulaire d'ajout/edition d'arme
   * Si l'etat de newWeaponForm est a true alors remet le signal weaponToEdit a null au cas ou l'on serait dans le cas
   * d'une annulation d'edition d'arme
   */
  public showAddForm(): void {
    if (this.isShowFormComponent) {
      this.selectedWeapon.set(null);
    }
    this.isShowFormComponent = !this.isShowFormComponent;
  }

  /**
   *
   * Lors qu'une nouvelle arme est enregister en bdd l'ajoute a la liste des armes
   * @param weapon WeaponDto
   */
  public addedEvent(weapon: WeaponDto): void {
    this._weapons.push(weapon);
    const caliberId = weapon.caliber.id;
    this.filterByCaliber(caliberId);
    this.currentCaliberId.set(caliberId);
    this.isShowFormComponent = false;
  }

  /**
   * Filtre les armes affocher par calibre
   * @param id
   */
  public filterByCaliber(id: number): void {
    this.filteredWeapons = this._weapons.filter((w) => w.caliber.id === id);
  }

  /**
   * Affiche une popup de confirmation avant suppression de l'arme
   * @param event Event
   * @param weapon WeaponDto
   */
  public async confirm(event: Event, weapon: WeaponDto): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Supprimer cette arme ?',
      this._currentPageMessageHeader
    );
    if (confirmed) {
      this.disableWeapon(weapon.id);
    }
  }

  /**
   * Dective l'arme en base de donnée
   * @param id
   */
  private disableWeapon(id: number): void {
    this.weaponService
      .disableWeapon({
        id: id
      })
      .subscribe({
        next: (res) => {
          this._weapons = res;
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Arme desactivée'
          );
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
   * Affiche le formulaire d'edition de l'arme
   * @param weapon WeaponDto qui sera passe en input dans le formulaire
   */
  public showEditForm(weapon: WeaponDto): void {
    this.isShowFormComponent = !this.isShowFormComponent;
    this.selectedWeapon.set(weapon);
  }

  /**
   * Une fois l'arme correctement editée, met a jour le tableau d'arme avec l'arme editée
   * Efface le filtre du calibre selectioné
   * @param weapon
   */
  public editedEvent(weapon: WeaponDto): void {
    const index = this._weapons.findIndex((w) => w.id === weapon.id);
    this._weapons.splice(index, 1);
    this._weapons.push(weapon);
    this.filteredWeapons = this._weapons;
    this.currentCaliberId.set(0);
    this.isShowFormComponent = false;
  }
}
