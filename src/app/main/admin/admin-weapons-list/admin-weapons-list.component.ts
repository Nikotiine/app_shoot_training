import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { WeaponService } from '../../../core/api/services/weapon.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { WeaponDto } from '../../../core/api/models/weapon-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { WeaponFormComponent } from '../../weapon/weapon-add/weapon-form.component';
import { TabViewModule } from 'primeng/tabview';
import { forkJoin } from 'rxjs';
import { CaliberTableListComponent } from '../../caliber/caliber-table-list/caliber-table-list.component';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryDto } from '../../../core/api/models/factory-dto';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';
import { FactoryService } from '../../../core/api/services/factory.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaliberDropdownComponent } from '../../caliber/caliber-dropdown/caliber-dropdown.component';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-admin-weapons-list',
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
    CaliberDropdownComponent
  ],
  templateUrl: './admin-weapons-list.component.html',
  styleUrl: './admin-weapons-list.component.scss'
})
export class AdminWeaponsListComponent implements OnInit {
  private readonly weaponService: WeaponService = inject(WeaponService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  private readonly currentPageMessageHeader: string =
    'Administration des armes';
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
  public weapons: WeaponDto[] = [];
  public filteredWeapons: WeaponDto[] = [];
  public newWeaponForm: boolean = false;
  public factories: FactoryDto[] = [];
  public currentCaliberId = signal(0);
  public weaponToEdit: WritableSignal<WeaponDto | null> = signal(null);

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
        this.weapons = data[0];
        this.filteredWeapons = data[0];
        this.factories = data[1];
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this.currentPageMessageHeader,
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
  public add(): void {
    if (this.newWeaponForm) {
      this.weaponToEdit.set(null);
    }
    this.newWeaponForm = !this.newWeaponForm;
  }

  /**
   *
   * Lors qu'une nouvelle arme est enregister en bdd l'ajoute a la liste des armes
   * @param newWeapon WeaponDto
   */
  public weaponAdded(newWeapon: WeaponDto): void {
    this.weapons.push(newWeapon);
    const caliberId = newWeapon.caliber.id;
    this.filterByCaliber(caliberId);
    this.currentCaliberId.set(caliberId);
    this.newWeaponForm = false;
  }

  /**
   * Filtre les armes affocher par calibre
   * @param id
   */
  public filterByCaliber(id: number): void {
    this.filteredWeapons = this.weapons.filter((w) => w.caliber.id === id);
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
      this.currentPageMessageHeader
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
          this.weapons = res;
          this.customMessageService.successMessage(
            this.currentPageMessageHeader,
            'Arme desactivée'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  /**
   * Affiche le formulaire d'edition de l'arme
   * @param weapon WeaponDto qui sera passe en input dans le formulaire
   */
  public editWeapon(weapon: WeaponDto): void {
    this.newWeaponForm = !this.newWeaponForm;
    this.weaponToEdit.set(weapon);
  }

  /**
   * Une fois l'arme correctement editée, met a jour le tableau d'arme avec l'arme editée
   * Efface le filtre du calibre selectioné
   * @param weapon
   */
  public weaponEdited(weapon: WeaponDto): void {
    const index = this.weapons.findIndex((w) => w.id === weapon.id);
    this.weapons.splice(index, 1);
    this.weapons.push(weapon);
    this.filteredWeapons = this.weapons;
    this.currentCaliberId.set(0);
    this.newWeaponForm = false;
  }
}
