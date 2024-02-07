import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-joule',
  standalone: true,
  imports: [
    InputNumberModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './joule.component.html',
  styleUrl: './joule.component.scss'
})
export class JouleComponent {
  public form: FormGroup;
  public result: number | null = null;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      weight: [0, [Validators.min(1), Validators.required]],
      speed: [0, [Validators.min(1), Validators.required]]
    });
  }

  calculate() {
    this.result = 1;
  }
}
