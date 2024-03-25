import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { OpticsFormComponent } from '../optics-form/optics-form.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { OpticsDto } from '../../../core/api/models/optics-dto';
import { OpticsService } from '../../../core/api/services/optics.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-optics-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    OpticsFormComponent,
    SharedModule,
    TableModule
  ],
  templateUrl: './optics-list.component.html',
  styleUrl: './optics-list.component.scss'
})
export class OpticsListComponent implements OnInit {
  // Private field
  private readonly _currentPageMessageHeader: string =
    'Administration des optiques';
  private readonly opticsService: OpticsService = inject(OpticsService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  // Public field
  public optics: OpticsDto[] = [];
  public isShowFormComponent: boolean = false;
  public selectedOptics: WritableSignal<OpticsDto | null> = signal(null);

  public ngOnInit(): void {
    this.loadOptics();
  }

  /**
   * Charge la liste de toutes les optiques (active ou non)
   */
  private loadOptics(): void {
    this.opticsService.getAllOptics().subscribe({
      next: (optics) => {
        this.optics = optics;
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
   * Affiche le formulaire d'ajouit ou d'edition d'une optique
   * Si une edition a ete charge puis annule met le signal opticsToEdit a null
   */
  public showAddForm(): void {
    if (this.isShowFormComponent) {
      this.selectedOptics.set(null);
    }
    this.isShowFormComponent = !this.isShowFormComponent;
  }

  /**
   * Met a jour la liste des optique apres la creation d'une nouvelle
   * @param optics OpticsDto
   */
  public addedEvent(optics: OpticsDto): void {
    this.optics.push(optics);
    this.isShowFormComponent = false;
  }

  /**
   * Pop up de confirmation pour la suppression d'une optique
   * @param event Event
   * @param optics OpticsDto
   */
  public async confirm(event: Event, optics: OpticsDto): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Supprimer cette optique ?',
      this._currentPageMessageHeader
    );
    if (confirmed) {
      this.disableOptics(optics.id);
    }
  }

  /**
   * Soummission de la desactivation de l'optique
   * Met a jour la liste des optique une fois celle ci desactive
   * @param id de l'optique
   */
  private disableOptics(id: number): void {
    this.opticsService
      .disableOptics({
        id: id
      })
      .subscribe({
        next: (res) => {
          this.optics = res;
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
   * Affiche le formualaire d'edition de l'optique
   * ajoute l'object OpticsDto au signal opticsToEdit pour pre remplir le formulaire d'edition
   * @param optic OpticsDto
   */
  public showEditForm(optic: OpticsDto): void {
    this.selectedOptics.set(optic);
    this.isShowFormComponent = !this.isShowFormComponent;
  }

  /**
   * Met a jour la liste des optique apres edition d'une optique
   * Cherche et trouve l'optique modifie , la supprime du tableau et ajoute l'optique modifie
   * Passe le signal opticsToEdit a null
   * @param optics OpticsDto
   */
  public editedEvent(optics: OpticsDto): void {
    const index = this.optics.findIndex((o) => o.id === optics.id);
    this.optics.splice(index, 1);
    this.optics.push(optics);
    this.isShowFormComponent = !this.isShowFormComponent;
    this.selectedOptics.set(null);
  }
}
