import {
  Component,
  EventEmitter,
  inject,
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
export class GroupFormComponent implements OnInit {
  // Private field
  public groups: TrainingSessionGroupCreateDto[] = [];

  // Public field

  public form: FormGroup = inject(FormBuilder).group({
    totalShoots: [0],
    score: [0],
    horizontalGap: [0],
    verticalGap: [0]
  });

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() sessionGroup: EventEmitter<TrainingSessionGroupCreateDto[]> =
    new EventEmitter<TrainingSessionGroupCreateDto[]>();
  public title: WritableSignal<string> = signal('titre');

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

  ngOnInit(): void {
    console.log(this.groups);
  }
}
