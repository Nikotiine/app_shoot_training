import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TrainingSessionGroupCreateDto } from '../../../../core/api/models/training-session-group-create-dto';
import { TableModule } from 'primeng/table';

import { TrainingService } from '../../../../core/app/services/training.service';

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
  private readonly trainingService: TrainingService = inject(TrainingService);

  // Public field
  public groups: TrainingSessionGroupCreateDto[] = [];
  public form: FormGroup = inject(FormBuilder).group({
    totalShoots: [10],
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

  //************************************ PUBLIC METHODS ************************************

  public add(): void {
    const sessionGroup: TrainingSessionGroupCreateDto = {
      totalShoots: this.form.controls['totalShoots'].value,
      score: this.transformScoreOnTenShootRatio(
        this.form.controls['score'].value,
        this.form.controls['totalShoots'].value
      ),
      horizontalGap: this.form.controls['horizontalGap'].value,
      verticalGap: this.form.controls['verticalGap'].value
    };
    this.groups.push(sessionGroup);
    this.form.controls['totalShoots'].setValue(10);
    this.form.controls['score'].setValue(0);
    this.form.controls['horizontalGap'].setValue(0);
    this.form.controls['verticalGap'].setValue(0);
  }

  public closeAndEmitGroups(): void {
    this.trainingService.savedForm('Resultats et groupememnts');
    this.sessionGroup.emit(this.groups);
  }

  /**
   * Pop-up de confirmation de suppression de la munition
   * @param event Event
   * @param index
   */
  public async confirm(event: Event, index: number): Promise<void> {
    const confirmed = await this.trainingService.confirmation(
      event,
      'Supprimer ce resultat ?'
    );
    if (confirmed) {
      this.groups.splice(index, 1);
    }
  }
  //************************************ PRIVATE METHODS ************************************

  /**
   * Transforme le score en resultat sur 100 points / ou equivalant sur 10 coups
   * @param score le score inscrit
   * @param shoots le nombre de munition tirée
   */
  private transformScoreOnTenShootRatio(score: number, shoots: number): number {
    if (shoots === 10) {
      return score;
    } else {
      return (score * 10) / shoots;
    }
  }
}
