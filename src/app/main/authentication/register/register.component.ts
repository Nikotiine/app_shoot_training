import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { RegistrationService } from '../../../core/api/services/registration.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { UserRegistrationDto } from '../../../core/api/models/user-registration-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public form: FormGroup;
  protected readonly Routing = Routing;
  constructor(
    private readonly fb: FormBuilder,
    private readonly registrationService: RegistrationService,
    private readonly customMessageService: CustomMessageService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public submit(): void {
    const email = this.form.controls['email'].value;
    const userRegistration: UserRegistrationDto = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: email,
      password: this.form.controls['password'].value
    };

    this.registrationService
      .register({
        body: userRegistration
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage(
            'Creation de compte',
            res.message
          );
          this.router.navigate([
            '/' + Routing.ACCOUNT_ACTIVATION + '/' + email + '/activate'
          ]);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            'Creation de compte',
            err.error.message
          );
          this.form.controls['email'].setValue(null);
          this.form.controls['password'].setValue(null);
        }
      });
  }
}
