import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { OpticsService } from '../../../core/api/services/optics.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { OpticsDto } from '../../../core/api/models/optics-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { OpticsFormComponent } from '../../optics/optics-form/optics-form.component';
import { TabViewModule } from 'primeng/tabview';
import { FactoryAddComponent } from '../../factory/factory-add/factory-add.component';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';
import { FactoryTableListComponent } from '../../factory/factory-table-list/factory-table-list.component';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RouterLink } from '@angular/router';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-admin-optics-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    OpticsFormComponent,
    TabViewModule,
    FactoryAddComponent,
    FactoryTableListComponent,
    RouterLink
  ],
  templateUrl: './admin-optics-list.component.html',
  styleUrl: './admin-optics-list.component.scss'
})
export class AdminOpticsListComponent implements OnInit {
  private readonly opticsService: OpticsService = inject(OpticsService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  public optics: OpticsDto[] = [];
  public newOpticsForm: boolean = false;
  public opticsToEdit: WritableSignal<OpticsDto | null> = signal(null);
  protected readonly FactoryType = FactoryType;
  protected readonly Routing = Routing;
  private readonly currentPageMessageHeader: string =
    'Administration des optiques';
  public ngOnInit(): void {
    this.loadOptics();
  }

  private loadOptics(): void {
    this.opticsService.getAllOptics().subscribe({
      next: (optics) => {
        this.optics = optics;
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
    if (this.newOpticsForm) {
      this.opticsToEdit.set(null);
    }
    this.newOpticsForm = !this.newOpticsForm;
  }

  public opticAdded(newOptics: OpticsDto): void {
    this.optics.push(newOptics);
    this.newOpticsForm = false;
  }

  public async confirm(event: Event, optics: OpticsDto): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Supprimer cette optique ?',
      this.currentPageMessageHeader
    );
    if (confirmed) {
      this.disable(optics.id);
    }
  }

  private disable(id: number): void {
    this.opticsService
      .disableOptics({
        id: id
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  public edit(optic: OpticsDto): void {
    this.opticsToEdit.set(optic);
    this.newOpticsForm = !this.newOpticsForm;
  }

  public opticEdited(optics: OpticsDto): void {
    const index = this.optics.findIndex((o) => o.id === optics.id);
    this.optics.splice(index, 1);
    this.optics.push(optics);
    this.newOpticsForm = !this.newOpticsForm;
    this.opticsToEdit.set(null);
  }
}
