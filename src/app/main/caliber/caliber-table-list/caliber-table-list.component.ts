import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CaliberFormComponent } from '../caliber-form/caliber-form.component';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

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
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly currentPageMessageHeader: string = 'Gestion des calibres';
  // Public field
  public calibers: CaliberDto[] = [];
  public visible: boolean = false;
  public caliberToEdit: WritableSignal<CaliberDto | null> = signal(null);
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.caliberService.getAllCalibers().subscribe({
      next: (calibers) => {
        this.calibers = calibers;
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this.currentPageMessageHeader,
          err.error.message
        );
      }
    });
  }
  public add(): void {
    if (this.visible) {
      this.caliberToEdit.set(null);
    }
    this.visible = !this.visible;
  }

  public newCaliber(newCaliber: CaliberDto): void {
    this.visible = false;
    this.calibers.push(newCaliber);
  }

  public edit(caliber: CaliberDto): void {
    this.visible = !this.visible;
    this.caliberToEdit.set(caliber);
  }

  public caliberEdited(caliber: CaliberDto): void {
    const index = this.calibers.findIndex((c) => c.id === caliber.id);
    this.calibers.splice(index, 1);
    this.calibers.push(caliber);
    this.visible = false;
    this.caliberToEdit.set(null);
  }
}
