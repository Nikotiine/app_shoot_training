import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CaliberFormComponent } from '../caliber-form/caliber-form.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { CaliberService } from '../../../core/app/services/caliber.service';

@Component({
  selector: 'app-caliber-table-list',
  standalone: true,
  imports: [ButtonModule, SharedModule, TableModule, CaliberFormComponent],
  templateUrl: './caliber-table-list.component.html',
  styleUrl: './caliber-table-list.component.scss'
})
export class CaliberTableListComponent implements OnInit {
  // Private field
  private readonly caliberService: CaliberService = inject(CaliberService);

  // Public field
  public calibers: CaliberDto[] = [];
  public visible: boolean = false;
  public $caliberToEdit: WritableSignal<CaliberDto | null> = signal(null);

  //************************************ PUBLIC METHODS ************************************

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Affiche le formulaire d'ajout de calibre
   * Set le signal $caliberToEdit a null
   */
  public add(): void {
    if (this.visible) {
      this.$caliberToEdit.set(null);
    }
    this.visible = !this.visible;
  }

  /**
   * Une fois le calibre ajoute en base de données met a jour le tableau des caloibres disponibles
   * @param newCaliber CaliberDto
   */
  public newCaliber(newCaliber: CaliberDto): void {
    this.visible = false;
    this.calibers.push(newCaliber);
  }

  /**
   * Affiche le formulaire d'edition de calibre, set le signal $caliberToEdit avec la valeur du calibrea modifier
   * @param caliber
   */
  public edit(caliber: CaliberDto): void {
    this.visible = !this.visible;
    this.$caliberToEdit.set(caliber);
  }

  /**
   * Une fois le calibre modifier met a jour le tableau des calibres disponible
   * Passe le signal $caliberToEdit a null
   * @param caliber
   */
  public caliberEdited(caliber: CaliberDto): void {
    const index = this.calibers.findIndex((c) => c.id === caliber.id);
    this.calibers.splice(index, 1);
    this.calibers.push(caliber);
    this.visible = false;
    this.$caliberToEdit.set(null);
  }
  //************************************ PRIVATE METHODS ************************************

  private loadData() {
    this.caliberService.getAll().subscribe({
      next: (calibers) => {
        this.calibers = calibers;
      },
      error: (err) => {
        this.caliberService.errorMessage(err.error.message);
      }
    });
  }
}
