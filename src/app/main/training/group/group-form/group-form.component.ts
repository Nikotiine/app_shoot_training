import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TrainingSessionGroupCreateDto } from '../../../../core/api/models/training-session-group-create-dto';
import { TableModule } from 'primeng/table';
import { CustomConfirmationService } from '../../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    PaginatorModule,
    ReactiveFormsModule,
    TableModule
  ],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss'
})
export class GroupFormComponent {
  // Private field
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);

  // Public field
  public groups: TrainingSessionGroupCreateDto[] = [];
  public form: FormGroup = inject(FormBuilder).group({
    totalShoots: [0],
    score: [0],
    horizontalGap: [0],
    verticalGap: [0]
  });

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() sessionGroup: EventEmitter<TrainingSessionGroupCreateDto[]> =
    new EventEmitter<TrainingSessionGroupCreateDto[]>();
  @Input() set trainingSession(groups: TrainingSessionGroupCreateDto[] | null) {
    if (groups) {
      this.groups = groups;
    }
  }
  public $_title: WritableSignal<string> = signal('titre');

  //************************************ PUBLIC METHODS ************************************

  public add(): void {
    const sessionGroup: TrainingSessionGroupCreateDto = {
      totalShoots: this.form.controls['totalShoots'].value,
      score: this.form.controls['score'].value,
      horizontalGap: this.form.controls['horizontalGap'].value,
      verticalGap: this.form.controls['verticalGap'].value
    };
    this.groups.push(sessionGroup);
    this.form.controls['totalShoots'].setValue(0);
    this.form.controls['score'].setValue(0);
    this.form.controls['horizontalGap'].setValue(0);
    this.form.controls['verticalGap'].setValue(0);
  }

  public closeAndEmitGroups(): void {
    this.sessionGroup.emit(this.groups);
  }

  /**
   * Pop-up de confirmation de suppression de la munition
   * @param event Event
   * @param index
   */
  public async confirm(event: Event, index: number): Promise<void> {
    const confirmed = await this.customConfirmationService.confirm(
      event,
      'Supprimer ce resultat ?',
      'Resultats et groupememnts'
    );
    if (confirmed) {
      this.groups.splice(index, 1);
    }
  }
  //************************************ PRIVATE METHODS ************************************
}
