import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal
} from '@angular/core';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';

import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { FactoryDto } from '../../../core/api/models/factory-dto';

import { FactoryFormComponent } from '../factory-form/factory-form.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { FactoryService } from '../../../core/app/services/factory.service';

@Component({
  selector: 'app-factory-table-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    FactoryFormComponent
  ],
  templateUrl: './factory-table-list.component.html',
  styleUrl: './factory-table-list.component.scss'
})
export class FactoryTableListComponent {
  // Private field
  private _factory!: FactoryType;
  private readonly factoryService: FactoryService = inject(FactoryService);
  private readonly _currentPageMessageHeader: string = 'Gestion des marques';
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  // Public field
  public $factoryToEdit: WritableSignal<FactoryDto | null> = signal(null);
  public factories: FactoryDto[] = [];
  public newFactoryForm: boolean = false;
  @Input() set factoryType(factory: FactoryType) {
    this._factory = factory;
    this.loadFactory(factory);
  }

  get factory() {
    return this._factory;
  }
  //************************************ PUBLIC METHODS ************************************

  /**
   * Affiche le formulaire pour une nouvelle marque
   * repasse le signal factoryToEdit a null si le formulaire est annule
   */
  public addFactory(): void {
    if (this.newFactoryForm) {
      this.$factoryToEdit.set(null);
    }
    this.newFactoryForm = !this.newFactoryForm;
  }

  /**
   * Met a jour la liste des marque apres ajout d'une nouvelle
   * @param event
   */
  public newFactory(event: FactoryDto): void {
    this.factories.push(event);
    this.newFactoryForm = false;
  }

  /**
   * Affiche le formulaire d'edition d'une marque et met le set le signal factoryToEdit avec la factory choisie
   * @param factory FactoryDto
   */
  public edit(factory: FactoryDto): void {
    this.newFactoryForm = !this.newFactoryForm;
    this.$factoryToEdit.set(factory);
  }

  /**
   * Met a jour la liste des factory apres modification d'une
   * @param factory FactoryDto
   */
  public editedFactory(factory: FactoryDto): void {
    const index = this.factories.findIndex((f) => f.id === factory.id);
    this.factories.splice(index, 1);
    this.factories.push(factory);
    this.$factoryToEdit.set(null);
    this.newFactoryForm = !this.newFactoryForm;
  }

  //************************************ PRIVATE METHODS ************************************

  /**
   * Charge la liste des marque en fonction du type demander
   * @param type FactoryType
   */
  private loadFactory(type: FactoryType): void {
    this.factoryService.getFactoriesByType(type).subscribe({
      next: (factories) => {
        this.factories = factories;
      },
      error: (err) => {
        this.factoryService.errorMessage(err.error.message);
      }
    });
  }
}
