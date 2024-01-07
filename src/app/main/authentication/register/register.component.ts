import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RegistrationDto } from '../../../core/api/models/registration-dto';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RegistrationService } from '../../../core/api/services/registration.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly registrationService: RegistrationService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public submit(): void {
    const shooterRegistration: RegistrationDto = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    };
    console.log(shooterRegistration);
    this.registrationService
      .register({
        body: shooterRegistration
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  protected readonly Routing = Routing;
}
